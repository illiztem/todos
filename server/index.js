const express = require('express')
const app = express()

const TasksRoute = require('./routers/tasksRoute')

app.use('/tasks', TasksRoute)

app.listen(3001, () => {
  console.log('Running on port 3001')
})
