const products = [
  {
    id: 1,
    name: "Dell",
    description:
      "Dell inspiron 15-3583 Intel celeron 4205U 14 Inch 4k LCD Display",
    brand: "Dell",
    price: 10000,
    new: false,
    discountPercentage: 0,
    rating: 2,
    stock: 1,
    bestSeller: false,
    thumbnails: ["/p1.jpg", "/omen.png", "/omen.png", "/sam.png"],
    category: "Laptop",
    use: "business",
    image: "/omen.png",
  },
  {
    id: 2,
    name: "Huawei Pro",
    description:
      "Huawei inspiron 15-3583 Intel celeron 4205U 14 Inch 4k LCD Display",
    brand: "Huawei",
    price: 800,
    new: false,
    discountPercentage: 0,
    rating: 3.0,
    stock: 2,
    bestSeller: true,
    thumbnails: ["/p1.jpg", "/omen.png", "/omen.png", "/sam.png"],
    category: "Phone",
    image: "/omen.png",
  },
  {
    id: 3,
    name: "Samsung S Pro",
    description:
      "Samsung inspiron 15-3583 Intel celeron 4205U 14 Inch 4k LCD Display",
    brand: "Samsung",
    price: 1000,
    new: false,
    discountPercentage: 0,
    rating: 4.49,
    stock: 4,
    bestSeller: true,
    thumbnails: ["/p1.jpg", "/omen.png", "/omen.png", "/sam.png"],
    category: "Computer",
    image: "/omen.png",
  },
  {
    id: 4,
    name: "Techno 9 Pro",
    description:
      "Techno inspiron 15-3583 Intel celeron 4205U 14 Inch 4k LCD Display",
    brand: "Techno",
    price: 100,
    new: true,
    discountPercentage: 0,
    rating: 4.49,
    stock: 9,
    bestSeller: true,
    thumbnails: ["/p1.jpg", "/omen.png", "/omen.png", "/sam.png"],
    category: "Phone",
    image: "/omen.png",
  },
  {
    id: 5,
    name: "Samsung",
    description: "Samsung inspiron 15-3583 Intel celeron 4205U 14 Inch 4k LCD Display",
    brand: "Samsung",
    price: 100,
    new: true,
    discountPercentage: 0,
    rating: 4.49,
    stock: 94,
    bestSeller: true,
    thumbnails: ["/p1.jpg", "/omen.png", "/omen.png", "/sam.png"],
    category: "Laptop",
    use: "gaming",
    image: "/omen.png",
  },
  {
    id: 6,
    name: "Techno 12 Pro",
    description: "Techno inspiron 15-3583 Intel celeron 4205U 14 Inch 4k LCD Display",
    brand: "Techno",
    price: 1000,
    new: true,
    discountPercentage: 0,
    rating: 4.49,
    stock: 94,
    bestSeller: true,
    thumbnails: ["/p1.jpg", "/omen.png", "/omen.png", "/sam.png"],
    category: "Laptop",
    use: "coding",
    image: "/omen.png",
  },
  {
    id: 7,
    name: "Redmi Pro",
    description:
      "RedMi inspiron 15-3583 Intel celeron 4205U 14 Inch 4k LCD Display",
    brand: "RedMi",
    price: 800,
    new: true,
    discountPercentage: 50,
    rating: 4.59,
    stock: 94,
    bestSeller: true,
    thumbnails: ["/p1.jpg", "/omen.png", "/omen.png", "/sam.png"],
    category: "Printer",
    image: "/omen.png",
  },
  {
    id: 8,
    name: "Iphone",
    description: "Iphone inspiron 15-3583 Intel celeron 4205U 14 Inch 4k LCD Display",
    brand: "Samsung",
    price: 1000,
    new: true,
    discountPercentage: 18,
    rating: 4.49,
    stock: 94,
    bestSeller: true,
    thumbnails: ["/p1.jpg", "/omen.png", "/omen.png", "/sam.png"],
    category: "printer",
    image: "/omen.png",
  },
  {
    id: 9,
    name: "Iphone 9 Pro",
    description:
      "Iphone inspiron 15-3583 Intel celeron 4205U 14 Inch 4k LCD Display",
    brand: "Apple",
    price: 100,
    new: true,
    discountPercentage: 70,
    rating: 4.49,
    stock: 101,
    bestSeller: true,
    thumbnails: ["/p1.jpg", "/omen.png", "/omen.png", "/sam.png"],
    category: "Networking",
    image: "/omen.png",
  },
  {
    id: 10,
    name: "Samsung 14",
    description: "Samsung inspiron 15-3583 Intel celeron 4205U 14 Inch 4k LCD Display",
    brand: "Samsung",
    price: 100,
    new: false,
    discountPercentage: 90,
    rating: 4.49,
    stock: 94,
    bestSeller: true,
    thumbnails: ["/p1.jpg", "/omen.png", "/omen.png", "/sam.png"],
    category: "Monitor",
    image: "/omen.png",
  },
  {
    id: 11,
    name: "Samsung 19 Pro",
    description: "Samsung inspiron 15-3583 Intel celeron 4205U 14 Inch 4k LCD Display",
    brand: "Samsung",
    price: 100,
    new: false,
    discountPercentage: 0,
    rating: 4.49,
    stock: 94,
    bestSeller: true,
    thumbnails: ["/p1.jpg", "/omen.png", "/omen.png", "/sam.png"],
    category: "Phone",
    image: "/omen.png",
  },
  {
    id: 12,
    name: "RedMi X",
    description:
      "RedMi inspiron 15-3583 Intel celeron 4205U 14 Inch 4k LCD Display",
    brand: "Apple",
    price: 100,
    new: true,
    discountPercentage: 0,
    rating: 4.49,
    stock: 94,
    bestSeller: false,
    thumbnails: ["/p1.jpg", "/omen.png", "/omen.png", "/sam.png"],
    category: "Phone",
    image: "/omen.png",
  },
  {
    id: 13,
    name: "RedMi",
    description: "RedMi inspiron 15-3583 Intel celeron 4205U 14 Inch 4k LCD Display",
    brand: "Apple",
    price: 100,
    new: true,
    discountPercentage: 0,
    rating: 4.49,
    stock: 94,
    bestSeller: false,
    thumbnails: ["/p1.jpg", "/omen.png", "/omen.png", "/sam.png"],
    category: "Computer",
    image: "/omen.png",
  },
  {
    id: 14,
    name: "Dell",
    description: "Dell inspiron 15-3583 Intel celeron 4205U 14 Inch 4k LCD Display",
    brand: "Apple",
    price: 100,
    new: true,
    discountPercentage: 0,
    rating: 4.49,
    stock: 94,
    bestSeller: false,
    thumbnails: ["/p1.jpg", "/omen.png", "/omen.png", "/sam.png"],
    category: "Monitor",
    image: "/omen.png",
  },
  {
    id: 15,
    name: "Samsung",
    description:
      "Samsung inspiron 15-3583 Intel celeron 4205U 14 Inch 4k LCD Display",
    brand: "Samsung",
    price: 100,
    new: false,
    discountPercentage: 10,
    rating: 4.49,
    stock: 94,
    bestSeller: false,
    thumbnails: ["/p1.jpg", "/omen.png", "/omen.png", "/sam.png"],
    category: "Phone",
    image: "/omen.png",
  },
  {
    id: 16,
    name: "Huawei Y6s 2024",
    description:
      "Dell inspiron 15-3583 Intel celeron 4205U 14 Inch 4k LCD Display",
    brand: "Huawei",
    price: 100,
    new: true,
    discountPercentage: 8,
    rating: 4.49,
    stock: 94,
    bestSeller: false,
    thumbnails: ["/p1.jpg", "/omen.png", "/omen.png", "/sam.png"],
    category: "Phone",
    image: "/omen.png",
  },
];
module.exports = products;
