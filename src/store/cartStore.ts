  // cartStore.ts
  import { create } from "zustand";
  import { persist, createJSONStorage } from "zustand/middleware";

  export type Product = {
    id: string;
    name: string;
    mililitres: number;
    category?: string;
    price: number;
    image: string; 
    quantity: number;
  };

  type CartStore = {
    cart: Product[];
    addToCart: (product: Omit<Product, "quantity">) => void;
    updateQuantity: (id: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    _hasHydrated: boolean;
    setHasHydrated: (state: boolean) => void;
  };

  export const useCartStore = create<CartStore>()(
    persist(
      (set) => ({
        cart: [],
        _hasHydrated: false,

        setHasHydrated: (state) => set({ _hasHydrated: state }),

        addToCart: (product) =>
          set((state) => {
            const exists = state.cart.find((p) => p.id === product.id);

            if (exists) {
              return {
                cart: state.cart.map((item) =>
                  item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
                ),
              };
            }

            return {
              cart: [...state.cart, { 
                ...product, 
                quantity: 1,
                image: product.image || "/placeholder.jpg" 
              }],
            };
          }),

        updateQuantity: (id, quantity) =>
          set((state) => ({
            cart: state.cart.map((item) =>
              item.id === id
                ? { ...item, quantity: Math.max(1, quantity) }
                : item
            ),
          })),

        removeFromCart: (productId) =>
          set((state) => ({
            cart: state.cart.filter((p) => p.id !== productId),
          })),

        clearCart: () => set({ cart: [] }),
      }),
      {
        name: "cart-storage",
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
          state?.setHasHydrated(true);
        },
      }
    )
  );