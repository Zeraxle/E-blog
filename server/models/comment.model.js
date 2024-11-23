import { DataTypes } from "sequelize";
import { sequelize } from "../config/sequelize.config.js";
import Post from "./post.model.js";
import User from "./user.model.js";

export const Comments = sequelize.define("comments", {
    id:{
        type: DataTypes.BIGINT,
        allowNull : false,
        autoIncrement: true,
        primaryKey : true

    },
    userId:{
        type: DataTypes.BIGINT,
        allowNull : false,
    },

    postId:{
        type: DataTypes.BIGINT,
        allowNull : false,
    },

    parentId: {
        type: DataTypes.BIGINT,
        allowNull: true
    },

    content:{
        type: DataTypes.STRING,
        allowNull : false,
        validate : {
            len : [1, 100]
        }
    },

},
{timestamps: true}

)
export const setupPostToCommentRelationship =() =>{
    Post.hasMany(Comments,{
        foreignKey : "postId",
        as: 'comments',
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
    })

    Comments.belongsTo(Post,{
        foreignKey: "postId",
        as : 'post',
        onDelete: "CASCADE",
        onUpdate : "CASCADE"
    })

    User.hasMany(Comments,{
        foreignKey : "userId",
        as: 'userComments',
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
    })

    Comments.belongsTo(User,{
        foreignKey: "userId",
        as: 'user',
        onDelete: "CASCADE",
        onUpdate : "CASCADE"
    })

    Comments.hasMany(Comment, {
        foreignKey: 'parentId',
        as: 'replies'
    })

}




export default Comments
// Comments.sync({alter:true})
// .then(console.log("comments table created"))
// .catch(error => console.log(`comment table failed: ${error}`))