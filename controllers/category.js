const Categories = require('../models/Category')

const Category = {
  get: async (req, res) => {
    const { id } = req.params
    const category = await Categories.findOne({ _id: id })
    res.status(200).send(category)
  },

  list: async (req, res) => {
    const category = await Categories.find()
    res.status(200).send(category)
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
