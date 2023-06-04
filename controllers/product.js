const Products = require('../models/Product')
const Users = require('../models/User')
const Categories = require('../models/Category')

const product = {
  get: async (req, res) => {
    try {
      const { id } = req.params
      const product = await Products.findOne({ _id: id })
        .populate('categories')
        .populate('reviews')
      res.status(200).send(product)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  list: async (req, res) => {
    try {
      const products = await Products.find()
        .populate('categories')
        .populate('reviews')
      res.status(200).send(products)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  create: async (req, res) => {
    const product = new Products(req.body)
    try {
      await product.save()

      // Actualiza la propiedad "products" del usuario con el nuevo ID del producto
      await Users.findByIdAndUpdate(product.user, {
        $push: { products: product._id },
      })

      res.status(201).send('Producto Registrado correctamente')
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  update: async (req, res) => {
    const { id } = req.params
    const product = await Products.findOne({ _id: id })
    Object.assign(user, req.body)
    await product.save()
    res.sendStatus(204)
  },

  addCategory: async (req, res) => {
    const { id } = req.params
    const { category } = req.body
    try {
      const product = await Products.findOne({ _id: id })

      if (!product) {
        return res.status(404).send('Producto no encontrado')
      }

      // Verificar si la categoría ya está asignada al producto
      if (product.categories.includes(category)) {
        return res.status(400).send('La categoría ya está asignada al producto')
      }

      product.categories.push(category)
      await product.save()

      // Agregar el producto al modelo de Category
      const categoryObj = await Categories.findOne({ _id: category })
      if (categoryObj) {
        categoryObj.products.push(product._id)
        await categoryObj.save()
      }

      res.sendStatus(204)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  removeCategory: async (req, res) => {
    const { id } = req.params
    const { category } = req.body
    try {
      const product = await Products.findOne({ _id: id })

      if (!product) {
        return res.status(404).send('Producto no encontrado')
      }

      const categoryIndex = product.categories.indexOf(category)
      if (categoryIndex !== -1) {
        product.categories.splice(categoryIndex, 1)
        await product.save()

        const categoryObj = await Categories.findOne({ _id: category })
        if (categoryObj) {
          const productIndex = categoryObj.products.indexOf(product._id)
          if (productIndex !== -1) {
            categoryObj.products.splice(productIndex, 1)
            await categoryObj.save()
          }
        }

        res.sendStatus(204)
      } else {
        res.status(404).send('Categoría no encontrada en el producto')
      }
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params
    const product = await Products.findOne({ _id: id })
    if (product) {
      await user.remove()
    }
    res.sendStatus(204)
  },
}

module.exports = product
