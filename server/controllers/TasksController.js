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
  const { title, description } = req.body

  const response = await Tasks.create({ title, description }).then(data => {
    return data
  }).catch(error => {
    return error
  })

  res.status(200).json({
    success: true,
    data: response
  })
}

controllers.get = async (req, res) => {
  const { id } = req.params

  const response = await Tasks.findAll({ where: { id } }).then(data => {
    return data
  }).catch(error => {
    return error
  })

  res.status(200).json({
    success: true,
    data: response
  })
}

controllers.completed = async (req, res) => {
  const { id } = req.params

  const response = await Tasks.update({ completed: 1 }, { where: { id } }).then(data => {
    return data
  }).catch(error => {
    return error
  })

  res.status(200).json({
    success: true,
    data: response
  })
}

controllers.edit = async (req, res) => {
  const { id } = req.params
  const { title, description } = req.body

  const response = await Tasks.update({ title, description }, { where: { id } }).then(data => {
    return data
  }).catch(error => {
    return error
  })

  res.status(200).json({
    success: true,
    data: response
  })
}

controllers.delete = async (req, res) => {
  const { id } = req.params

  const response = await Tasks.destroy({ where: { id } }).then(data => {
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
