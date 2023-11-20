const { DataTypes} = require('sequelize');
const sequelize = require('./index');

const User = sequelize.define('utilisateurs',{
    uiid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    civility: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    qrcode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    gift: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    notgift: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fonction: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "users"
    },
    delete: {
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

module.exports = User;