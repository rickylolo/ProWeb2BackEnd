const express = require('express')
const router = express.Router()
const list = require('../controllers/list')

router.get('/list', list.list)
router.get('/list:id', list.get)
router.post('/list', list.create)
router.put('/list:id', list.update)
router.delete('/list:id', list.destroy)

module.exports = router
