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
    userid:{
        type: DataTypes.BIGINT,
        allowNull : false,
    },

    postid:{
        type: DataTypes.BIGINT,
        allowNull : false,
    },

    Comment:{
        type: DataTypes.STRING,
        allowNull : false,
        validate:{
            len:{
            args: [3,255],
            msg: 'Comments must be more than 3 characters and less than 255'
        }
    },
}

},
{timestamps: true}

)
export const setupPostToCommentRelationship =() =>{
    Post.hasMany(Comments,{
        foreignKey : "postid",
        as: 'comments',
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
    })

    Comments.belongsTo(Post,{
        foreignKey: "postid",
        as : 'post',
        onDelete: "CASCADE",
        onUpdate : "CASCADE"
    })

    User.hasMany(Comments,{
        foreignKey : "userid",
        as: 'userComments',
        onDelete : "CASCADE",
        onUpdate : "CASCADE"
    })

    Comments.belongsTo(User,{
        foreignKey: "userid",
        as: 'user',
        onDelete: "CASCADE",
        onUpdate : "CASCADE"
    })

}



// Comments.sync({alter:true})
// .then(console.log("comments table created"))
// .catch(error => console.log(`comment table failed: ${error}`))

export default Comments