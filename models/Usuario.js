const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'usuarios'
const UserSchema = {
    id:{
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        field: 'id_usuario',
        type: DataTypes.INTEGER,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
    }
};

class Usuario extends Model { //Otorga find, findall, etc
    static associate() {
        //realciones
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'Usuario',
            timestamps: false
        }
    }
}
module.exports = { USER_TABLE, UserSchema, Usuario }
