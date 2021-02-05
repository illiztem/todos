const express = require('express')
const router = express.Router()

const TasksController = require('../controllers/TasksController')

router.get('/', TasksController.index)
router.post('/create', TasksController.create)

module.exports = router
