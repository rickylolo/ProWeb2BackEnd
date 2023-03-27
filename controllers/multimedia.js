const Multimedias = require('../models/Multimedia')

const multimedia = {
    get: async (req, res) => {
      const { id } = req.params
      const multimedia = await Multimedias.findOne({ _id: id })
      res.status(200).send(multimedia)
    },
    multimedia: async (req, res) => {
      const multimedia = await Multimedias.find()
      res.status(200).send(multimedia)
    },
    create: async (req, res) => {
      const multimedia = new Multimedias(req.body)
      try {
        await multimedia.save()
        res.status(201).send('Archivo Multimedia subido con exito')
      } catch (err) {
        res.status(500).send(err.message)
      }
    },
    update: async (req, res) => {
      const { id } = req.params
      const multimedia = await Multimedias.findOne({ _id: id })
      Object.assign(user, req.body)
      await multimedia.save()
      res.sendStatus(204)
    },
    destroy: async (req, res) => {
      const { id } = req.params
      const multimedia = await Multimedias.findOne({ _id: id })
      if (multimedia) {
        await user.remove()
      }
      res.sendStatus(204)
    },
  }
  
  module.exports = multimedia