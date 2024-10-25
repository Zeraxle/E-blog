import {DataTypes} from 'sequelize'
import { sequelize } from '../config/sequelize.config.js'
import User from './user.model.js'

const Post = sequelize.define('posts', {

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
            len : {
                args: [3,35],
                msg: "Name must be between 3-35 characters"
            }
        }
    },
    
    category : {
        type : DataTypes.ENUM('Movie', 'TV Show', 'Anime'),
        required : [true, 'Post needs a category'],
        allowNull : false,
        validate: {
            isIn: {
                args: [['Movie', 'TV Show', 'Anime']],
                msg: "Not an acceptable input for category"
            }
        } 
    },


    rating : {
        type : DataTypes.INTEGER,
        required : [true, 'Post needs a rating'],
        allowNull : false,
        validate : {
            min : {
                args: 1, 
                msg: "Rating must be at least 1"
            },
            max : {
                args: 5, 
                msg: "Rating must not exceed 5"
            }
        }
    },

    description : {
        type : DataTypes.STRING,
        required : [true, 'Post needs a description'],
        allowNull : false,
        validate : {
            len : {
                args: [10, 100],
                msg: "Description must be between 10-100 characters"
        }
    }
}},
    {timestamps : true}
)



export const setupUserPostRealationship = () => {

    User.hasMany(Post, {
        foreignKey: 'userid',
        as: 'posts',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

    Post.belongsTo(User, {
        foreignKey: 'userid',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    });

}


Post.sync({alter : true})
    .then(console.log('Post table created'))
    .catch(error => console.log(`Post table failed : ${error}`))


export default Post