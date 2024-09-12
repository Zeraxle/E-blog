import {DataTypes} from 'sequelize'
import { sequelize } from '../config/sequelize.config.js'

export const Post = sequelize.define('posts', {

    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },

    category : {
        type : DataTypes.STRING,
        required : [true, 'Post needs a category'],
        allowNull : false,
    },

    rating : {
        type : DataTypes.INTEGER,
        required : [true, 'Post needs a rating'],
        allowNull : false,
        validate : {
            len : [1,5]
        }
    },

    description : {
        type : DataTypes.STRING,
        required : [true, 'Post needs a description'],
        allowNull : false
    }
},
    {timestamps : true}
)

Post.sync({alter : true})
    .then(console.log('Post table created'))
    .catch(error => console.log(`Post table failed : ${error}`))

