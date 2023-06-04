const Carts = require('../models/Cart')
const Lists = require('../models/List')

const Cart = {
  get: async (req, res) => {
    const { id } = req.params
    try {
      const cart = await Carts.findOne({ _id: id })
        .populate('list')
        .populate({
          path: 'list',
          populate: {
            path: 'products.product',
            model: 'Product',
          },
        })

      res.status(200).send(cart)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  list: async (req, res) => {
    const Cart = await Carts.find()
      .populate('list')
      .populate({
        path: 'list',
        populate: {
          path: 'products.product',
          model: 'Product',
        },
      })

    res.status(200).send(Cart)
  },

  update: async (req, res) => {
    const { id } = req.params
    const Cart = await Carts.findOne({ _id: id })
    Object.assign(Cart, req.body)
    await Cart.save()
    res.sendStatus(204)
  },

  destroy: async (req, res) => {
    const { id } = req.params
    try {
      const cart = await Carts.findOne({ _id: id })

      if (!cart) {
        return res.status(404).send('Carrito no encontrado')
      }

      // Eliminar el list del cart
      const listId = cart.list
      if (listId) {
        const list = await Lists.findOne({ _id: listId })
        if (list) {
          await list.remove()
        }
      }

      await cart.remove()

      res.sendStatus(204)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },
}

module.exports = Cart
