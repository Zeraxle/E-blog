import {DataTypes} from 'sequelize'
import { sequelize } from '../config/sequelize.config.js'
// import User from './user.model.js'

const Post = sequelize.define('posts', {

    // userid : {
    //     type : DataTypes.BIGINT,
    //     allowNull : false, 

    //     references: {
    //         model : "User",
    //         key : "id"
    //     }
    // },

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





    // User.hasMany(Post)
    // Post.belongsTo(User,{
    //     foreignKey : "userid",
    //     onDelete : "SET NULL",
    //     onUpdate : "CASCADE;",
    // })



Post.sync({alter : true})
    .then(console.log('Post table created'))
    .catch(error => console.log(`Post table failed : ${error}`))


    export default Post