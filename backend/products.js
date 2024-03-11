const products = [
    {
        id: 1,
        name: "Dell",
        description: "6.1 Inch Display",
        brand: "Apple",
        price: 1000,
        status: "New",
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        bestSeller: true,
        "thumbnail": "...",
        "images": ["...", "...", "..."],
        category: "Laptop",
        image: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"

    },
    {
        id: 2,
        name: "Huawei Pro",
        description: "5.7 Inch Display",
        brand: "Huawei",
        price: 800,
        status: "New",
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        bestSeller: true,
        "thumbnail": "...",
        "images": ["...", "...", "..."],
        category: "Phone",
        image: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-02.jpg"

    }, {
        id: 3,
        name: "Galaxy S Pro",
        description: "6.1 Inch Display",
        brand: "Samsung",
        price: 1000,
        status: "New",
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        bestSeller: true,
        "thumbnail": "...",
        "images": ["...", "...", "..."],
        category: "Computer",
        image: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg"

    },
    {
        id: 4,
        name: "Galaxy 9 Pro",
        description: "6.1 Inch Display",
        brand: "Techno",
        price: 100,
        status: "New",
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        bestSeller: true,
        "thumbnail": "...",
        "images": ["...", "...", "..."],
        category: "Accessory",
        image: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg"

    },
    {
        id: 5,
        name: "HP",
        description: "6.1 Inch Display",
        brand: "Samsung",
        price: 100,
        status: "New",
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        bestSeller: true,
        "thumbnail": "...",
        "images": ["...", "...", "..."],
        category: "Laptop",
        image: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"

    },
    {
        id: 6,
        name: "Iphone 12 Pro",
        description: "6.1 Inch Display",
        brand: "Techno",
        price: 1000,
        status: "New",
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        bestSeller: true,
        "thumbnail": "...",
        "images": ["...", "...", "..."],
        category: "Phone",
        image: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg"

    },
    {
        id: 7,
        name: "Huawei Pro",
        description: "5.7 Inch Display",
        brand: "RedMi",
        price: 800,
        status: "New",
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        bestSeller: true,
        "thumbnail": "...",
        "images": ["...", "...", "..."],
        category: "Printer",
        image: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg"

    }, {
        id: 8,
        name: "Lenovo",
        description: "6.1 Inch Display",
        brand: "Apple",
        price: 1000,
        status: "New",
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        bestSeller: true,
        "thumbnail": "...",
        "images": ["...", "...", "..."],
        category: "printer",
        image: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"

    },
    {
        id: 9,
        name: "Galaxy 9 Pro",
        description: "6.1 Inch Display",
        brand: "Apple",
        price: 100,
        status: "New",
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        bestSeller: true,
        "thumbnail": "...",
        "images": ["...", "...", "..."],
        category: "Networking",
        image: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-03.jpg"

    },
    {
        id: 10,
        name: "Huawei 9 Pro",
        description: "6.1 Inch Display",
        brand: "Apple",
        price: 100,
        status: "New",
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        bestSeller: true,
        "thumbnail": "...",
        "images": ["...", "...", "..."],
        category: "Monitor",
        image: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg"

    },
    {
        id: 11,
        name: "Huawei 9 Pro",
        description: "6.1 Inch Display",
        brand: "Apple",
        price: 100,
        status: "New",
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        bestSeller: true,
        "thumbnail": "...",
        "images": ["...", "...", "..."],
        category: "Phone",
        image: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg"

    },
    {
        id: 12,
        name: "Huawei 9 Pro",
        description: "6.1 Inch Display",
        brand: "Apple",
        price: 100,
        status: "New",
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        bestSeller: true,
        "thumbnail": "...",
        "images": ["...", "...", "..."],
        category: "Phone",
        image: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg"

    },
    {
        id: 13,
        name: "Huawei 9 Pro",
        description: "6.1 Inch Display",
        brand: "Apple",
        price: 100,
        status: "New",
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        bestSeller: true,
        "thumbnail": "...",
        "images": ["...", "...", "..."],
        category: "Computer",
        image: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg"

    },
    {
        id: 14,
        name: "Huawei 9 Pro",
        description: "6.1 Inch Display",
        brand: "Apple",
        price: 100,
        status: "New",
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        bestSeller: true,
        "thumbnail": "...",
        "images": ["...", "...", "..."],
        category: "Monitor",
        image: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg"

    },
    {
        id: 15,
        name: "Huawei 12 Pro",
        description: "6.1 Inch Display",
        brand: "Apple",
        price: 100,
        status: "New",
        discountPercentage: 12.96,
        rating: 4.69,
        stock: 94,
        bestSeller: true,
        "thumbnail": "...",
        "images": ["...", "...", "..."],
        category: "Accessory",
        image: "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-04.jpg"

    }

];
module.exports = products;