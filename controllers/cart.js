const Carts = require('../models/Cart')

const Cart = {
  get: async (req, res) => {
    const { id } = req.params
    const Cart = await Carts.findOne({ _id: id })
    res.status(200).send(Cart)
  },

  list: async (req, res) => {
    const Cart = await Carts.find()
    res.status(200).send(Cart)
  },

  create: async (req, res) => {
    const Cart = new Carts(req.body)
    try {
      await Cart.save()
      res.status(201).send('Agregado a carrito')
    } catch (err) {
      res.status(500).send(err.message)
    }
  },
  update: async (req, res) => {
    const { id } = req.params
    const Cart = await Carts.findOne({ _id: id })
    Object.assign(user, req.body)
    await Cart.save()
    res.sendStatus(204)
  },
  destroy: async (req, res) => {
    const { id } = req.params
    const Cart = await Carts.findOne({ _id: id })
    if (Cart) {
      await user.remove()
    }
    res.sendStatus(204)
  },
}

module.exports = Cart
