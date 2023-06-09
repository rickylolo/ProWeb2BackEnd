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
    try {
      const { id } = req.params
      const { product, quantity } = req.body

      const list = await Lists.findOne({ _id: id })

      // Buscar el índice del producto en la lista
      const productIndex = list.products.findIndex(
        (item) => item.product.toString() === product
      )

      // Actualizar la cantidad del producto
      if (productIndex !== -1) {
        list.products[productIndex].quantity = quantity
      }

      await list.save()
      res.sendStatus(204)
    } catch (error) {
      console.error('Error al actualizar la lista:', error)
      res.sendStatus(500)
    }
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
