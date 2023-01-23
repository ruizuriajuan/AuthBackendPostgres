const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
const setupModels = require('../models');

/*const dbConection = async () => {
    try {
        const conect = process.env.DATABASE_URL
        const pool = new Pool({conect}); 
        console.log('Base de datos iniciada..');
        return pool;
    } catch (error) {
        console.log('Error BD:', error);
        throw new Error('Error al inicializar la base de datos');
    }
}*/

const dbConection = async () => {
    try {
        const isProd = process.env.NODE_ENV === 'production'
        const options = {
            dialect: 'postgres',
            loggin: isProd ? console.log : console.log,
        }
        
        if (isProd) {
            options.dialectOptions = {
                ssl: { rejectUnauthorized: false }
            }
        }
        const conect = process.env.DATABASE_URL
        console.log('datos BD_____>',conect);
        const sequelize = new Sequelize(conect,options);
        await sequelize.authenticate();
        console.log('Conectada a la Base de datos.');
        setupModels(sequelize);
        console.log('modelos inciados...');
        //sequelize.sync(); crearia de nuevo las tablas respecto a los modelos.
        sequelize.sync();
    } catch (error) {
        console.log('Error BD:', error);
        throw new Error('Error al inicializar la base de datos');
    }
}


module.exports = { dbConection }