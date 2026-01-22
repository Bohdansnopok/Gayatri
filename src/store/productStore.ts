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
  updateProduct: (id: string, category: string, updatedFields: Partial<Product>) => Promise<void>;
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

  // Визначаємо асинхронну функцію, яка приймає ID продукту, категорію та об'єкт з новими даними
  updateProduct: async (id: string, category: string, updatedFields: any) => {
    try {
      // Приводимо назву категорії до нижнього регістру для коректності URL
      const categoryLower = category.toLowerCase();

      console.log(`Updating product:`, {
        id,
        category: categoryLower,
        updatedFields,
      });

      // Відправляємо запит PUT до нашого API.
      // Передаємо заголовки, щоб сервер зрозумів, що ми шлемо JSON, та саме тіло запиту
      const res = await fetch(`${API}/${categoryLower}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      });

      // Перевіряємо статус відповіді (res.ok повертає true, якщо код 200-299)
      if (!res.ok) {
        if (res.status === 404) {
          throw new Error(`Продукт для оновлення не знайдено (ID: ${id})`);
        }
        throw new Error(`Помилка при оновленні: ${res.status}`);
      }

      // Отримуємо оновлений об'єкт продукту, який повернув сервер
      const updatedProductFromServer = await res.json();

      // Логіка оновлення локального стейту залежно від категорії
      switch (categoryLower) {
        case "face":
          // Використовуємо .map(): якщо ID збігається — замінюємо продукт на новий, інакше залишаємо старий
          set((state) => ({
            faceProducts: state.faceProducts.map((p) =>
              p.id === id ? { ...p, ...updatedProductFromServer.product } : p,
            ),
          }));
          break;
        case "body":
          set((state) => ({
            bodyProducts: state.bodyProducts.map((p) =>
              p.id === id ? { ...p, ...updatedProductFromServer.product } : p,
            ),
          }));
          break;
        case "hair":
          set((state) => ({
            hairProducts: state.hairProducts.map((p) =>
              p.id === id ? { ...p, ...updatedProductFromServer.product } : p,
            ),
          }));
          break;
        case "decor":
          set((state) => ({
            decorProducts: state.decorProducts.map((p) =>
              p.id === id ? { ...p, ...updatedProductFromServer.product } : p,
            ),
          }));
          break;
        case "oils":
          set((state) => ({
            oilsProducts: state.oilsProducts.map((p) =>
              p.id === id ? { ...p, ...updatedProductFromServer.product } : p,
            ),
          }));
          break;
        default:
          console.warn(`Невідома категорія для оновлення: ${category}`);
      }

      console.log(`Product ${id} updated successfully in ${category}`);
    } catch (error: any) {
      // Логуємо помилку для відладки та прокидаємо її далі для обробки в UI (наприклад, для сповіщень)
      console.error("Error updating product:", error);
      throw error;
    }
  },

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
