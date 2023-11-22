const { DataTypes} = require('sequelize');
const sequelize = require('./index');

const Admin = sequelize.define('admins',{
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fonction: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "admins"
    },
    disabled: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW, // Définie la date actuelle par défaut
    }
}, {
    timestamps: false,
});

module.exports = Admin;