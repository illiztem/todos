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

  res.json({ success: true, response })
}

module.exports = controllers
