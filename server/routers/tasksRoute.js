const express = require('express')
const router = express.Router()

const TasksController = require('../controllers/TasksController')

router.get('/', TasksController.index)
router.post('/create', TasksController.create)
router.get('/get/:id', TasksController.get)
router.patch('/completed/:id', TasksController.completed)
router.put('/edit/:id', TasksController.edit)

module.exports = router
