export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  category: string;
  image: string;
}
export interface ItemListProps {
  defaultCategory: string | null;
}
