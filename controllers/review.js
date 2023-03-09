const Reviews = require('../models/Review')

const review = {
  get: async (req, res) => {
    const { id } = req.params
    const review = await Reviews.findOne({ _id: id })
    res.status(200).send(review)
  },
  list: async (req, res) => {
    const review = await Reviews.find()
    res.status(200).send(review)
  },
  create: async (req, res) => {
    const review = new Reviews(req.body)
    try {
      await review.save()
      res.status(201).send('Reseña Registrada Correctamente')
    } catch (err) {
      res.status(500).send(err.message)
    }
  },
  update: async (req, res) => {
    const { id } = req.params
    const review = await Reviews.findOne({ _id: id })
    Object.assign(user, req.body)
    await review.save()
    res.sendStatus(204)
  },
  destroy: async (req, res) => {
    const { id } = req.params
    const review = await Reviews.findOne({ _id: id })
    if (review) {
      await user.remove()
    }
    res.sendStatus(204)
  },
}

module.exports = review
