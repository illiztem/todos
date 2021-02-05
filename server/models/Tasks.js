const { Sequelize } = require('sequelize')
const Seuelize = require('sequelize')

const sequelize = require('./index.js')

const tableName = 'list_tasks'

const taskLsit = sequelize.define(tableName, {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  date: Sequelize.DATE,
  completed: Sequelize.BOOLEAN,
},
{ timestamps: false}
)

module.exports = taskLsit
