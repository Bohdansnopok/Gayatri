import { create } from "zustand";

const API =
  process.env.NODE_ENV === "production"
    ? "https://gayatri-backend-dn3j.onrender.com"
    : "http://localhost:5000";

type Product = {
  id: string;
  image: string;
  name: string;
  price: number;
  category?: string;
  mililitres: number;
  description?: string;
};

type NewProduct = {
  name: string;
  price: number;
  imageFile: File;
  mililitres: number;
  description?: string;
};

type Store = {
  oilsProducts: Product[];
  faceProducts: Product[];
  bodyProducts: Product[];
  hairProducts: Product[];
  decorProducts: Product[];

  fetchOilsProducts: () => Promise<void>;
  fetchFaceProducts: () => Promise<void>;
  fetchBodyProducts: () => Promise<void>;
  fetchHairProducts: () => Promise<void>;
  fetchDecorProducts: () => Promise<void>;

  addProduct: (product: NewProduct, category: string) => Promise<Product>;

  deleteProduct: (id: string, category: string) => Promise<void>;
};

export const useProductStore = create<Store>((set, get) => ({
  oilsProducts: [],
  faceProducts: [],
  bodyProducts: [],
  hairProducts: [],
  decorProducts: [],

  fetchFaceProducts: async () => {
    try {
      const res = await fetch(`${API}/face`);
      const data = await res.json();
      set({
        faceProducts: data.map((p: any) => ({ ...p, imageFile: p.image })),
      });
    } catch (error) {
      console.error("Error fetching face products:", error);
    }
  },

  fetchOilsProducts: async () => {
    try {
      const res = await fetch(`${API}/oils`);
      const data = await res.json();
      set({
        oilsProducts: data.map((p: any) => ({ ...p, imageFile: p.image })),
      });
    } catch (error) {
      console.error("Error fetching face products:", error);
    }
  },

  fetchBodyProducts: async () => {
    try {
      const res = await fetch(`${API}/body`);
      const data = await res.json();
      set({
        bodyProducts: data.map((p: any) => ({ ...p, imageFile: p.image })),
      });
    } catch (error) {
      console.error("Error fetching body products:", error);
    }
  },

  fetchHairProducts: async () => {
    try {
      const res = await fetch(`${API}/hair`);
      const data = await res.json();
      set({
        hairProducts: data.map((p: any) => ({ ...p, imageFile: p.image })),
      });
    } catch (error) {
      console.error("Error fetching hair products:", error);
    }
  },

  fetchDecorProducts: async () => {
    try {
      const res = await fetch(`${API}/decor`);
      const data = await res.json();
      set({
        decorProducts: data.map((p: any) => ({ ...p, imageFile: p.image })),
      });
    } catch (error) {
      console.error("Error fetching decor products:", error);
    }
  },

  addProduct: async (product: NewProduct, category: string) => {
    try {
      const categoryLower = category.toLowerCase();

      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price.toString());
      formData.append("category", categoryLower);
      formData.append("mililitres", product.mililitres.toString());
      formData.append("description", product.description || "");

      if (product.imageFile) {
        formData.append("image", product.imageFile);
      }

      const res = await fetch(`${API}/${categoryLower}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(`Failed to add product: ${res.statusText}`);
      }

      const newProduct = await res.json();

      // Мапимо image → imageFile для рендеру у компоненті
      const mappedProduct = { ...newProduct, imageFile: newProduct.image };

      switch (categoryLower) {
        case "face":
          set((state) => ({
            faceProducts: [...state.faceProducts, mappedProduct],
          }));
          break;
        case "body":
          set((state) => ({
            bodyProducts: [...state.bodyProducts, mappedProduct],
          }));
          break;
        case "hair":
          set((state) => ({
            hairProducts: [...state.hairProducts, mappedProduct],
          }));
          break;
        case "decor":
          set((state) => ({
            decorProducts: [...state.decorProducts, mappedProduct],
          }));
          break;
      }

      return mappedProduct;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  },

  // src/store/productStore.ts

  deleteProduct: async (id: string, category: string) => {
    try {
      const categoryLower = category.toLowerCase();

      // Додаємо логування для дебагу
      console.log(`Deleting product:`, { id, category: categoryLower });

      const res = await fetch(`${API}/${categoryLower}/${id}`, {
        method: "DELETE",
      });

      console.log(`Delete response status:`, res.status, res.statusText);

      if (!res.ok) {
        // Більш детальна помилка
        if (res.status === 404) {
          throw new Error(
            `Продукт не знайдено (ID: ${id}, категорія: ${category})`,
          );
        }
        throw new Error(
          `Не вдалося видалити продукт: ${res.status} ${res.statusText}`,
        );
      }

      // Оновлюємо локальний стан
      switch (categoryLower) {
        case "face":
          set((state) => ({
            faceProducts: state.faceProducts.filter(
              (product) => product.id !== id,
            ),
          }));
          break;
        case "body":
          set((state) => ({
            bodyProducts: state.bodyProducts.filter(
              (product) => product.id !== id,
            ),
          }));
          break;
        case "hair":
          set((state) => ({
            hairProducts: state.hairProducts.filter(
              (product) => product.id !== id,
            ),
          }));
          break;
        case "decor":
          set((state) => ({
            decorProducts: state.decorProducts.filter(
              (product) => product.id !== id,
            ),
          }));
          break;
        case "oils":
          set((state) => ({
            oilsProducts: state.oilsProducts.filter(
              (product) => product.id !== id,
            ),
          }));
          break;
        default:
          console.warn(`Невідома категорія для видалення: ${category}`);
      }

      console.log(`Product ${id} deleted successfully from ${category}`);
    } catch (error: any) {
      console.error("Error deleting product:", error);
      // Можна додати додаткову інформацію
      console.error("Product ID:", id);
      console.error("Category:", category);
      throw error;
    }
  },
}));
