const { Sequelize} = require('sequelize');

var database = 'reveillon';

// connect to database

const sequelize = new Sequelize(`${database}`, 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(() =>{
    console.log("================================================");
    console.log('Connecté à la base de données ' + database);
    console.log("================================================");
}).catch((err) =>{
    console.error("Impossible de se connecter à la base de donnée" + err);
})

module.exports = sequelize;