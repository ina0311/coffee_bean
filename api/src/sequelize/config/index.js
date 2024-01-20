const sequelize = {
  dialect: 'mysql',
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  timezone: '+09:00',
}

module.exports = sequelize
