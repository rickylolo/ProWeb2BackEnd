const Lists = require('../models/List')

const list = {
  get: async (req, res) => {
    const { id } = req.params
    const list = await Lists.findOne({ _id: id })
    res.status(200).send(list)
  },
  list: async (req, res) => {
    const list = await Lists.find()
    res.status(200).send(list)
  },
  create: async (req, res) => {
    const list = new Lists(req.body)
    try {
      await list.save()
      res.status(201).send('Lista registrada Correctamente')
    } catch (err) {
      res.status(500).send(err.message)
    }
  },
  update: async (req, res) => {
    const { id } = req.params
    const list = await Lists.findOne({ _id: id })
    Object.assign(user, req.body)
    await list.save()
    res.sendStatus(204)
  },
  destroy: async (req, res) => {
    const { id } = req.params
    const list = await Lists.findOne({ _id: id })
    if (list) {
      await user.remove()
    }
    res.sendStatus(204)
  },
}

module.exports = list
