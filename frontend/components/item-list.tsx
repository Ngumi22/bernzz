// ItemList.tsx
import React, { useEffect } from "react";
import { useGetCategoryQuery } from "@/lib/productsApi";

interface ItemListProps {
  category: string;
}
interface Product {
  id: number;
  name: string;
}
const ItemList: React.FC<ItemListProps> = ({ category }) => {
  const { data: items, isLoading, isError } = useGetCategoryQuery(category);

  useEffect(() => {
    if (!isLoading && !isError && items) {
      console.log(`Items in ${category}:`, items);
    }
  }, [category, items, isLoading, isError]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading items in {category}</p>;
  }

  return (
    <div>
      <h2>{category} Items</h2>
      <ul>
        {items?.map((item: Product) => (
          <li key={item.id}>
            <p>{item.name}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
