const Products = require('../models/Product')

const product = {
  get: async (req, res) => {
    const { id } = req.params
    const product = await Products.findOne({ _id: id })
    res.status(200).send(product)
  },

  list: async (req, res) => {
    const product = await Products.find()
    res.status(200).send(product)
  },

  create: async (req, res) => {
    const product = new Products(req.body)
    try {
      await product.save()
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
