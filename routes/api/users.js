const express = require('express')
const router = express.Router()
const usersCtrl = require('../../controllers/users')

/*----- Public Routes -----*/
router.post('/signup', usersCtrl.signup)
router.get('/login', usersCtrl.login)

module.exports = router