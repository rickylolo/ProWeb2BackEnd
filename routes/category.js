const express = require('express')
const router = express.Router()
const category = require('../controllers/category')

router.get('/category', category.list)
router.get('/category/:id', category.get)
router.post('/category', category.create)
router.put('/category/:id', category.update)
router.delete('/category/:id', category.destroy)

module.exports = router
