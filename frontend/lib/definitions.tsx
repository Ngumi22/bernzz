export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  category: string;
  image: string;
  discountPercentage: number;
  new: boolean;
  bestSeller: boolean;
  rating: number;
  stock: number;
}
export interface ItemListProps {
  defaultCategory: string | null;
}
