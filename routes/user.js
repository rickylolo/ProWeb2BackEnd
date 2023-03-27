const express = require('express')
const router = express.Router()
const user = require('../controllers/user')
const Authentification = require('../middlewares/auth')

router.get('/user', user.list)
router.get('/user:id', Authentification(), user.get)
router.post('/user/login', user.login)
router.post('/user', user.create)
router.put('/user:id', user.update)
router.delete('/user:id', user.destroy)

module.exports = router
