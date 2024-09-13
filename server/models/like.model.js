import {DataTypes} from 'sequelize'
import { sequelize } from '../config/sequelize.config.js'

export const Like = sequelize.define('likes', {

    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    }
},
    {timestamps : true}
)

Like.sync({alter : true})
    .then(console.log('Like table created'))
    .catch(error => console.log(`Like table failed : ${error}`))