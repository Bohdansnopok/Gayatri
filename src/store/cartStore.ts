import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Product = {
  id: number;
  name: string;
  mililitres: string;
  category: string;
  price: number;
  image?: string;
};

type CartStore = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
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
          if (exists) return state;
          return { cart: [...state.cart, product] };
        }),

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