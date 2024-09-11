import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";


const User = sequelize.define('user', {

    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },

    firstName : {
        type : DataTypes.STRING,
        required : [true, 'User needs a first name'],
        allowNull : false,
        validate : {
            len : [2, 30]
        }
    },

    lastName : {
        type : DataTypes.STRING,
        required : [true, 'User needs a last name'],
        allowNull : false,
        validate : {
            len : [2, 30]
        }
    },

    username : {
        type : DataTypes.STRING,
        required : [true, 'User needs a username'],
        allowNull : false,
        unique : true,
        validate : {
            len : [5, 30]
        },
        
    },

    email : {
        type : DataTypes.STRING,
        required : [true, 'User needs an email'],
        allowNull : false,
        unique : true,
        validate : {
            len : [8, 50],
            isEmail : true
        },

    password : {
        type : DataTypes.STRING,
        required : [true, 'User needs a password'],
        allowNull : false,
        validate : {
            len : [8, 50]
        }
    }
    }
},
{ timestamps : true}

)

User.sync({alter : true})
    .then(console.log('User table created'))
    .catch(error => console.log(`User table failed : ${error}`))

export default User