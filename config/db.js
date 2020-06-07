const sequelize = require('sequelize');
const database = 'hotel';
const user = 'root';


const dbconnect = new sequelize(database, user, '', {
    dialect: "mysql"
})
dbconnect.sync({});

module.exports = dbconnect;