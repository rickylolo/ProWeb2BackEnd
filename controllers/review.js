const Reviews = require('../models/Review')
const Users = require('../models/User')
const Products = require('../models/Product')

const review = {
  get: async (req, res) => {
    const { id } = req.params
    try {
      const review = await Reviews.findOne({ _id: id })
        .populate('user')
        .populate('product')
      res.status(200).send(review)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  list: async (req, res) => {
    try {
      const reviews = await Reviews.find().populate('user').populate('product')
      res.status(200).send(reviews)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  create: async (req, res) => {
    const { user, product } = req.body

    try {
      // Verificar si el usuario ya ha realizado una reseña para el producto
      const existingReview = await Reviews.findOne({ user, product })

      if (existingReview) {
        return res
          .status(403)
          .send('Ya has realizado una reseña para este producto')
      }

      const review = new Reviews(req.body)
      await review.save()

      // Actualiza la propiedad "reviews" del usuario con el nuevo ID del producto
      await Users.findByIdAndUpdate(review.user, {
        $push: { reviews: review._id },
      })

      // Actualiza la propiedad "reviews" del producto con el nuevo ID del producto
      await Products.findByIdAndUpdate(review.product, {
        $push: { reviews: review._id },
      })

      res.status(201).send('Reseña registrada correctamente')
    } catch (err) {
      res.status(500).send(err.message)
    }
  },

  update: async (req, res) => {
    const { id } = req.params
    const review = await Reviews.findOne({ _id: id })
    Object.assign(review, req.body)
    await review.save()
    res.sendStatus(204)
  },
  destroy: async (req, res) => {
    const { id } = req.params

    try {
      const review = await Reviews.findOne({ _id: id })

      if (review) {
        // Eliminar la reseña de la colección Reviews
        await review.remove()

        // Eliminar la referencia de la reseña en la colección de usuarios (Users)
        await Users.updateOne({ _id: review.user }, { $pull: { reviews: id } })

        // Eliminar la referencia de la reseña en la colección de productos (Products)
        await Products.updateOne(
          { _id: review.product },
          { $pull: { reviews: id } }
        )
      }

      res.sendStatus(204)
    } catch (err) {
      res.status(500).send(err.message)
    }
  },
}

module.exports = review
