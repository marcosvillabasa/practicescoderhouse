const express = require('express')
const router = express.Router()
const Product = require('../../classes/Product')

const product = new Product()

router.get('/', (req, res) => {
  res.json(product.getAll())
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const prod = product.getByID(id)
  if (prod) {
    res.status(200).json(prod)
  }
  res.status(404).json({ error: `Product with id: ${id} does not exist!` })
})

router.post('/', (req, res) => {
  const { title, price, thumbnail } = req.body || {}
  if (!title || !price || !thumbnail) {
    return res.status(400).json({ ok: false, error: 'Invalid fields' })
  }

  const newProduct = {
    id: product.getLength() + 1,
    title,
    price,
    thumbnail
  }
  product.addProduct(newProduct)

  return res.status(200).json({ ok: true, newProduct })
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { title, price, thumbnail } = req.body
  if (!title || !price || !thumbnail) {
    return res.status(400).json({ ok: false, error: 'Invalid fields' })
  }
  const prodIndex = data.findIndex((product) => product.id === parseInt(id))
  if (prodIndex < 0)
    return res.status(404).json({ ok: false, error: `Product with id: ${id} does not exist!` })
  const newProduct = {
    ...data[prodIndex],
    title,
    price,
    thumbnail
  }
  data[prodIndex] = newProduct
  return res.json({ ok: true, product: newProduct })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const prod = data.find((prod) => prod.id === parseInt(id))
  if (!prod) {
    return res.status(404).json({ ok: false, error: `Product with id: ${id} does not exist!` })
  }
  data = data.filter((prod) => prod.id !== parseInt(id))
  return res.status(200).json({ ok: true, msg: `Product with id: ${id} was removed!` })
})

module.exports = router
