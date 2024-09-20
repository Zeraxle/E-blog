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
        onUpdate : "CASCADE",
        onDelete : "CASCADE",
    })

    Follow.belongsTo(User,{
        foreignKey: "followedUserId",
        onUpdate : "CASCADE",
        onDelete : "CASCADE"
    })


    // SEE WHO USER IS FOLLOWING 
    User.hasMany(Follow,{
        foreignKey : "followerId",
        onUpdate : "CASCADE",
        onDelete : "CASCADE"
    })

    Follow.belongsTo(User,{
        foreignKey: "followerId",
        onUpdate : "CASCADE",
        onDelete : "CASCADE"
    })
}
export default Follow