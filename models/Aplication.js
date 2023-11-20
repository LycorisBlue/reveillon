const { DataTypes} = require('sequelize');
const sequelize = require('./index');

const Aplication = sequelize.define('aplications',{
    uiid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fonction: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "aplications"
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

module.exports = Aplication;