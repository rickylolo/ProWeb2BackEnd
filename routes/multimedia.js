const express = require('express')
const router = express.Router()
const multimedia = require('../controllers/multimedia')

router.get('/multimedia', multimedia.list)
router.get('/multimedia:id', multimedia.get)
router.post('/multimedia', multimedia.create)
router.put('/multimedia:id', multimedia.update)
router.delete('/multimedia:id', multimedia.destroy)

module.exports = router
