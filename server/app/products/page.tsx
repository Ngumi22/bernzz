import getProducts from "./fetchData";

const Products = async () => {
  const products = await getProducts("SELECT * FROM products", []);

  return <div>{JSON.stringify(products)}</div>;
};

export default Products;
