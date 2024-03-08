const products = require("./products")

const express = require('express')
const cors = require('cors')
const app = express()


app.use(express.json())
app.use(cors())


app.get("/", ((req, res) => (
    res.send("Welcome")
)))

app.get("/products", ((req, res) => (
    res.send(products)
)))
app.get("/products/category", (req, res) => {
    const categories = [...new Set(products.map(product => product.category))];
    res.send(categories);
});

const port = process.env.PORT || 5000
app.listen(port, console.log(`Server running on port ${port}`))