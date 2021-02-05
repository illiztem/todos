const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  'tasks',
  'root',
  '',
  {
    host: 'localhost',
    dialect: 'mysql'
  }
)

module.exports = sequelize
