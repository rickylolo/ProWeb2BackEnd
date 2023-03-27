const Listsproducts = require('../models/Listproducts')

const listproducts = {
    get: async (req, res) => {
      const { id } = req.params
      const listproducts = await Listsproducts.findOne({ _id: id })
      res.status(200).send(listproducts)
    },
    listproducts: async (req, res) => {
      const listproducts = await Listsproducts.find()
      res.status(200).send(listproducts)
    },
    create: async (req, res) => {
      const listproducts = new Listsproducts(req.body)
      try {
        await listproducts.save()
        res.status(201).send('lista guardada')
      } catch (err) {
        res.status(500).send(err.message)
      }
    },
    update: async (req, res) => {
      const { id } = req.params
      const listproducts = await Listsproducts.findOne({ _id: id })
      Object.assign(user, req.body)
      await listproducts.save()
      res.sendStatus(204)
    },
    destroy: async (req, res) => {
      const { id } = req.params
      const listproducts = await Listsproducts.findOne({ _id: id })
      if (listproducts) {
        await user.remove()
      }
      res.sendStatus(204)
    },
  }
  
  module.exports = listproducts