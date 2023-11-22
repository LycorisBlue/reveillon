const { DataTypes} = require('sequelize');
const sequelize = require('./index');

const Code = sequelize.define('codes',{
    uiid: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
    },
    creator: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // 0 pour unitisation et 1 pour utilisation
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
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

module.exports = Code;