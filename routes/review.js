const express = require('express')
const router = express.Router()
const review = require('../controllers/review')

router.get('/review', review.list)
router.get('/review/:id', review.get)
router.post('/review', review.create)
router.put('/review/:id', review.update)
router.delete('/review/:id', review.destroy)

module.exports = router
