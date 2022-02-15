const express = require('express')
const router = express.Router()
//Routes
const productRoutes = require('./products/product.routes')

router.use('/products', productRoutes)

module.exports = router
