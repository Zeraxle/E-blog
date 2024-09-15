import {DataTypes} from 'sequelize'
import { sequelize } from '../config/sequelize.config.js'
import User from './user.model.js'

export const Post = sequelize.define('posts', {

    id : {
        type : DataTypes.BIGINT,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },

    userid : {
        type : DataTypes.BIGINT,
        allowNull : false, 
    },

    name : {
        type : DataTypes.STRING,
        required : [true, 'Post needs a name'],
        allowNull : false,
        validate : {
            len : [3,35]
        }
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



export const setupUserPostRealationship =() =>{

    User.hasMany(Post, {
        foreignKey: 'userid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    Post.belongsTo(User, {
        foreignKey: 'userid',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });
}



// Post.sync({alter : true})
//     .then(console.log('Post table created'))
//     .catch(error => console.log(`Post table failed : ${error}`))


    export default Post