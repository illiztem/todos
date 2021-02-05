const controllers = {}

const sequelize = require('../models/index')
const Tasks = require('../models/Tasks')

controllers.index = async (req, res) => {
  const response = await sequelize.sync().then(() => {
    const data = Tasks.findAll()
    return data
  }).catch(error => {
    return error
  })

  res.json({ success: true, data: response })
}

controllers.create = async (req, res) => {
  const {title, description} = req.body

  const response = await Tasks.create({title, description}).then(data => {
    return data
  }).catch(error => {
    return error
  })

  res.status(200).json({
    success: true,
    data: response
  })
}

module.exports = controllers
