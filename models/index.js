const {Usuario,UserSchema} = require('./Usuario');

//ir agregando todos los modelos.
function setupModels(sequelize) {
    Usuario.init(UserSchema, Usuario.config(sequelize));
}

module.exports = setupModels;