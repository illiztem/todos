const express = require('express')
const router = express.Router()

const TasksController = require('../controllers/TasksController')

router.get('/', TasksController.index)

module.exports = router
