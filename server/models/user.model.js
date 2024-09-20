import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";
import Post from "./post.model.js";
import Comments from "./comment.model.js";
import Like from "./like.model.js"
import Follow from "./follow.model.js";
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

}

)

const options = {
    feild: "password",
    rounds: 12,
    compare: "authenticate"
}

    User.sync({ force: false, alter : false  })
        .then(() => Post.sync({ force: false }))
        .then(() => Comments.sync({ force: false }))
        .then(() => Like.sync({ force: false }))
        .then(() => Follow.sync({force: false}))
        .then(() => console.log("All tables created"))
        .catch(error => console.log(`Table creation failed: ${error}`));
// Check if data is gettings saved 

export default User

useBcrypt(User,options)