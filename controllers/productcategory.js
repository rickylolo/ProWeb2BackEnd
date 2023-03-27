const Productcategories = require('../models/Productcategory')

const productcategory = {
    get: async (req, res) => {
      const { id } = req.params
      const productcategory = await Productcategories.findOne({ _id: id })
      res.status(200).send(productcategory)
    },
    productcategory: async (req, res) => {
      const productcategory = await Productcategories.find()
      res.status(200).send(productcategory)
    },
    create: async (req, res) => {
      const productcategory = new Productcategories(req.body)
      try {
        await productcategory.save()
        res.status(201).send('Producto a categoria')
      } catch (err) {
        res.status(500).send(err.message)
      }
    },
    update: async (req, res) => {
      const { id } = req.params
      const productcategory = await Productcategories.findOne({ _id: id })
      Object.assign(user, req.body)
      await productcategory.save()
      res.sendStatus(204)
    },
    destroy: async (req, res) => {
      const { id } = req.params
      const productcategory = await Productcategories.findOne({ _id: id })
      if (productcategory) {
        await user.remove()
      }
      res.sendStatus(204)
    },
  }
  
  module.exports = productcategory