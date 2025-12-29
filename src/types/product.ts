export interface Product {
  id: string;
  image: string;
  name: string;
  price: string;
  category: string;
}

interface CategorySectionProps {
  items: Product[];
  title: string;
}