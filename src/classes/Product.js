const products = require('../data/products.json')

class Product {
  constructor() {
    this.products = products
  }

  getAll() {
    return products
  }
  getByID(id) {
    return products.find((p) => p.id === +id)
  }
  getLength() {
    return products.length
  }
  addProduct(prod) {
    products.push(prod)
  }
  putProduct(id, body) {
    const prodIndex = products.findIndex((product) => product.id === +id)
    if (prodIndex < 0) return -1

    const newProduct = {
      ...products[prodIndex],
      ...body
    }
    products[prodIndex] = newProduct
    return newProduct
  }
}

module.exports = Product
