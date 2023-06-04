const Categories = require('../models/Category')

const Category = {
  get: async (req, res) => {
    try {
      const { id } = req.params
      const category = await Categories.findOne({ _id: id }).populate(
        'products'
      )
      res.status(200).send(category)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  list: async (req, res) => {
    try {
      const categories = await Categories.find().populate('products')
      res.status(200).send(categories)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  create: async (req, res) => {
    const category = new Categories(req.body)
    try {
      const isCategory = await Categories.findOne({ name: category.name })
      if (isCategory) {
        return res.status(403).send('Categoría ya existente')
      }
      await category.save()
      res.status(201).send('Categoria Registrada Correctamente')
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  update: async (req, res) => {
    const { id } = req.params
    const category = await Categories.findOne({ _id: id })
    Object.assign(category, req.body)
    await category.save()
    res.sendStatus(204)
  },

  destroy: async (req, res) => {
    const { id } = req.params
    const category = await Categories.findOne({ _id: id })
    if (category) {
      await user.remove()
    }
    res.sendStatus(204)
  },
}

module.exports = Category
