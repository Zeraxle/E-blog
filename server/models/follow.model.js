import {DataTypes} from 'sequelize'
import { sequelize } from '../config/sequelize.config.js'
import User from './user.model.js'
export const Follow = sequelize.define('follows', {

    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },

    // THE PERSON WHO IS BEING FOLLOWED 
    followedUserId:{
        type : DataTypes.BIGINT,
        allowNull: false
    },
      // THE PERSON WHO DID THE FOLLOWINGS ID
    followerId:{
        type : DataTypes.BIGINT,
        allowNull: false
    }
},
    {timestamps : true}
)


export const userAndFollowerRelationship = () =>{

    // SEE WHO FOLLOWS USER 
    User.hasMany(Follow,{
        foreignKey : "followedUserId",
        as: "followers",
        onUpdate : "CASCADE",
        onDelete : "CASCADE",
    })

    Follow.belongsTo(User,{
        foreignKey: "followedUserId",
        as: "followedUser",
        onUpdate : "CASCADE",
        onDelete : "CASCADE"
    })


    // SEE WHO USER IS FOLLOWING 
    User.hasMany(Follow,{
        foreignKey : "followerId",
        as: 'following',
        onUpdate : "CASCADE",
        onDelete : "CASCADE"
    })

    Follow.belongsTo(User,{
        foreignKey: "followerId",
        as: 'followerUser',
        onUpdate : "CASCADE",
        onDelete : "CASCADE"
    })
}
export default Follow