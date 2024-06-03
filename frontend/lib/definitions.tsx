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
  use: string;
  thumbnails: string;
}
export interface ItemListProps {
  defaultCategory: string | null;
}
export interface Slide {
  name: string;
  imgSrc: string;
}

export interface Category {
  name: string;
  href: string;
  id: number;
}
export interface Subcategory {
  id: number;
  name: string;
  href: string;
}

export interface CartItem {
  id: number; // Unique identifier for the cart item
  name: string; // Name of the product
  description: string; // Description of the product
  brand: string; // Brand of the product
  price: number; // Price of the product
  category: string; // Category of the product
  image: string; // URL of the product image
  discountPercentage: number; // Discount percentage for the product
  new: boolean; // Indicates if the product is new
  bestSeller: boolean; // Indicates if the product is a best seller
  rating: number; // Rating of the product
  stock: number; // Stock quantity of the product
  cartQuantity: number; // Quantity of the product in the cart
}

export interface CartState {
  cartItems: CartItem[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
}
export interface wishItem {
  id: number; // Unique identifier for the wish item
  name: string; // Name of the product
  description: string; // Description of the product
  brand: string; // Brand of the product
  price: number; // Price of the product
  category: string; // Category of the product
  image: string; // URL of the product image
  discountPercentage: number; // Discount percentage for the product
  new: boolean; // Indicates if the product is new
  bestSeller: boolean; // Indicates if the product is a best seller
  rating: number; // Rating of the product
  stock: number; // Stock quantity of the product
  wishQuantity: number; // Quantity of the product in the wish
}
export interface wishState {
  wishItems: wishItem[];
  wishTotalQuantity: number;
  wishTotalAmount: number;
}

export interface FileData {
  main_image: File;
  thumbnail1: File;
  thumbnail2: File;
  thumbnail3: File;
  thumbnail4: File;
  thumbnail5: File;
  fields: {
    sku: string;
    name: string;
    description: string;
    category: string;
    status: "Archived" | "Active" | "Draft";
    price: number;
    discount: number;
    quantity: number;
    brand: string;
  };
}
