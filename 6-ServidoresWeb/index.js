const express = require('express')
const Contenedor = require('./classes/Contenedor')

const app = express()

const PORT = process.env.port || 8080

const c = new Contenedor('./products.txt')

app.get('/productos', async (req, res) => {
  const prods = await c.getAll()
  res.json(prods)
})

app.get('/productoRandom', async (req,res) => {
  const prods = await c.getAll()
  let rand = Math.floor(Math.random()*prods.length);
  res.json(prods[rand])
})

app.listen(PORT, () => {
  console.log(`Server on port: ${PORT}`)
})
