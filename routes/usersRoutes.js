const express = require('express')
const getAllUsers = require('../controller/getAllUsers')
const getProfile = require('../controller/getSingleUser')

const users = express.Router()

users.get('/', getAllUsers)

users.get(/single/, getProfile)

module.exports = users