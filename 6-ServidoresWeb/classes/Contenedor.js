const fs = require('fs')

class Contenedor {
  constructor(fileName) {
    this.fileName = fileName
  }
  async createIfNotExists() {
    let file
    try {
      file = await fs.promises.readFile(this.fileName, 'utf-8')
      return JSON.parse(file)
    } catch (error) {
      if (error.code == 'ENOENT') {
        await fs.promises.writeFile(this.fileName, '[]')
        file = await fs.promises.readFile(this.fileName, 'utf-8')
        return JSON.parse(file)
      } else {
        console.log(error)
      }
    }
    return file
  }

  async save(prod) {
    let file = await contenedor.createIfNotExists()
    if (!file.length) {
      prod.id = 1
    } else {
      prod.id = file[file.length - 1].id + 1
    }

    try {
      file.push(prod)
      await fs.promises.writeFile('./products.txt', JSON.stringify(file, null, 2))
    } catch (error) {
      console.log(error)
    }
  }

  async getByID(number) {
    try {
      const products = await fs.promises.readFile('./products.txt', 'utf-8')
      const arrProducts = JSON.parse(products)
      const prod = arrProducts.find((p) => p.id === number)
      if (prod === undefined) {
        return null
      } else {
        return prod
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getAll() {
    try {
      const products = await fs.promises.readFile('./products.txt', 'utf-8')
      const arrProducts = JSON.parse(products)
      return arrProducts
    } catch (error) {
      console.log(error)
    }
  }
  async deleteById(id) {
    try {
      const products = await fs.promises.readFile('./products.txt', 'utf-8')
      const arrProducts = JSON.parse(products)
      const prods = arrProducts.filter((p) => p.id !== id)
      await fs.promises.writeFile('./products.txt', JSON.stringify(prods, null, 2))
    } catch (error) {
      console.log(error)
    }
  }
  async deleteAll() {
    try {
      await fs.promises.writeFile('./products.txt', '[]')
      return '[]'
    } catch (error) {
      console.log(error.mesage)
    }
  }
}

module.exports = Contenedor
