const Lists = require('../models/List')
const Users = require('../models/User')

const list = {
  get: async (req, res) => {
    const { id } = req.params
    try {
      const list = await Lists.findOne({ _id: id }).populate('products.product')
      res.status(200).send(list)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  list: async (req, res) => {
    try {
      const lists = await Lists.find().populate('products.product')
      res.status(200).send(lists)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  create: async (req, res) => {
    const list = new Lists(req.body)
    try {
      await list.save()

      // Obtener el usuario correspondiente
      const user = await Users.findOne({ _id: list.user })

      if (!user) {
        return res.status(404).send('Usuario no encontrado')
      }

      // Agregar el ID de la lista al arreglo de listas del usuario
      user.lists.push(list._id)
      await user.save()

      res.status(201).send('Lista registrada correctamente')
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  update: async (req, res) => {
    const { id } = req.params
    const list = await Lists.findOne({ _id: id })
    Object.assign(list, req.body)
    await list.save()
    res.sendStatus(204)
  },

  destroy: async (req, res) => {
    const { id } = req.params
    try {
      const list = await Lists.findOne({ _id: id })

      if (!list) {
        return res.status(404).send('Lista no encontrada')
      }

      // Eliminar la lista del modelo de Users
      const user = await Users.findOne({ _id: list.user })

      if (user) {
        user.lists.pull(list._id)
        await user.save()
      }

      await list.remove()

      res.sendStatus(204)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },
}

module.exports = list
