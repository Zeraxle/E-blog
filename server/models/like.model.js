import {DataTypes} from 'sequelize'
import Post from './post.model.js'
import User from './user.model.js'
import { sequelize } from '../config/sequelize.config.js'

export const Like = sequelize.define('likes', {

    userid : {
        type : DataTypes.BIGINT,
        allowNull : false,
    },

    postid : {
        type : DataTypes.BIGINT,
        allowNull : false,
    }
},
    {timestamps : true},

)

export const LikestoUserandPostRelationship = () =>{


    User.belongsToMany(Post, { through: Like, foreignKey: 'userid' });
    Post.belongsToMany(User, { through: Like, foreignKey: 'postid'});

}

// Like.sync({alter : true})
//     .then(console.log('Like table created'))
//     .catch(error => console.log(`Like table failed : ${error}`))

export default Like