const express = require('express')
const router = express.Router()

const { getAllUsers, getOneUser, deleteUser } = require('../controller/user')

//Get All Users
router.get('/',getAllUsers)

// Delete User
router.delete('/:id',deleteUser)

// Get One router
router.get('/find/:userId',getOneUser)

module.exports = router;