const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

const USER = encodeURIComponent('juan')
const PASS = encodeURIComponent('admin123')
const sequelize = new Sequelize(process.env.DATABASE_URL);
conectbd(sequelize)
async function conectbd(sequelize){
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = sequelize;