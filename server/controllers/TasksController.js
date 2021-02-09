const controllers = {}

const sequelize = require('../models/index')
const Tasks = require('../models/Tasks')

controllers.index = async (req, res) => {
  const serverRes = { success: false }
  const response = await sequelize.sync().then(() => {
    const data = Tasks.findAll()
    return data
  }).catch(error => {
    serverRes.msg = `Oops! Error found in the server: ${error}`
    return error
  })

  if (response) {
    serverRes.success = true
    serverRes.data = response
  } else {
    serverRes.msg = "Oops! The server couldn't find the requested data, try again later"
  }

  res.json(serverRes)
}

controllers.create = async (req, res) => {
  const serverRes = { success: false }
  const { title, description } = req.body

  const response = await Tasks.create({ title, description }).then(data => {
    return data
  }).catch(error => {
    serverRes.msg = `Oops! Error found in the server: ${error}`
    return error
  })

  if (response) {
    serverRes.success = true
    serverRes.data = response
  } else {
    serverRes.msg = "Oops! The server couldn't save the task, try again later"
  }

  res.json(serverRes)
}

controllers.get = async (req, res) => {
  const serverRes = { success: false }
  const { id } = req.params

  const response = await Tasks.findAll({ where: { id } }).then(data => {
    return data
  }).catch(error => {
    serverRes.msg = `Oops! Error found in the server: ${error}`
    return error
  })

  if (response) {
    serverRes.success = true
    serverRes.data = response
  } else {
    serverRes.msg = "Oops! The server couldn't show the task, try again later"
  }

  res.json(serverRes)
}

controllers.completed = async (req, res) => {
  const serverRes = { success: false }
  const { id } = req.params

  const response = await Tasks.update({ completed: 1 }, { where: { id } }).then(data => {
    return data
  }).catch(error => {
    serverRes.msg = `Oops! Error found in the server: ${error}`
    return error
  })

  if (response) {
    serverRes.success = true
    serverRes.data = response
  } else {
    serverRes.msg = "Oops! The server couldn't complete the task, try again later"
  }

  res.json(serverRes)
}

controllers.edit = async (req, res) => {
  const serverRes = { success: false }
  const { id } = req.params
  const { title, description } = req.body

  const response = await Tasks.update({ title, description }, { where: { id } }).then(data => {
    return data
  }).catch(error => {
    serverRes.msg = `Oops! Error found in the server: ${error}`
    return error
  })

  if (response) {
    serverRes.success = true
    serverRes.data = response
  } else {
    serverRes.msg = "Oops! The server couldn't edit the task, try again later"
  }

  res.json(serverRes)
}

controllers.delete = async (req, res) => {
  const serverRes = { success: false }
  const { id } = req.params

  const response = await Tasks.destroy({ where: { id } }).then(data => {
    return data
  }).catch(error => {
    serverRes.msg = `Oops! Error found in the server: ${error}`
    return error
  })

  if (+response) {
    serverRes.success = true
    serverRes.data = response
  } else {
    serverRes.msg = "Oops! The server couldn't delete the task, try again later"
  }

  res.json(serverRes)
}

module.exports = controllers
