import {DataTypes} from 'sequelize'
import { sequelize } from '../config/sequelize.config.js'

export const Follow = sequelize.define('follows', {

    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    }
},
    {timestamps : true}
)

Follow.sync({alter : true})
    .then(console.log('Follow table created'))
    .catch(error => console.log(`Follow table failed : ${error}`))