import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";
import Post from "./post.model.js";
import Comments from "./comment.model.js";
import Like from "./like.model.js"
import pkg, { compare } from 'bcrypt-node';


import useBcrypt from 'sequelize-bcrypt'

const User = sequelize.define('user', {

    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },

    firstName: {
        type: DataTypes.STRING,
        required: [true, 'User needs a first name'],
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },

    lastName: {
        type: DataTypes.STRING,
        required: [true, 'User needs a last name'],
        allowNull: false,
        validate: {
            len: [2, 30]
        }
    },

    username: {
        type: DataTypes.STRING,
        required: [true, 'User needs a username'],
        allowNull: false,
        unique: true,
        validate: {
            len: [5, 30]
        },

    },

    email: {
        type: DataTypes.STRING,
        required: [true, 'User needs an email'],
        allowNull: false,
        unique: true,
        validate: {
            len: [8, 50],
            isEmail: true
        }
    },



    password: {
        type: DataTypes.STRING,
        required: [true, 'User needs a password'],
        allowNull: false,
        validate: {
            len: [8, 50]
        }
    },
},
{
    timestamps: true ,
    indexes: [
        {
            unique: true,
            fields: ['username']
            // EXPLICITLY ADDS UNIQUE INDEX ON USERNAME
        },
        {
            unique: true,
            fields: ['email']
            // EXPLICITLY ADDS UNIQUE INDEX ON EMAIL 
        }
    ],
}

)

const options = {
    field : "password",
    rounds : 12,
    compare : "authenticate"
}

User.sync({ alter: true })
    .then(() => Post.sync({ alter: true }))
    .then(() => Comments.sync({ alter: true }))
    .then(() => Like.sync({ alter: true }))
    .then(() => console.log("All tables created"))
    .catch(error => console.log(`Table creation failed: ${error}`));

export default User

useBcrypt(User,options)