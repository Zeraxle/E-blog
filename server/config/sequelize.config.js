import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'

export const sequelize = new Sequelize (
    'eblogdb', 
    'root',
    'root',

    {
        host : "127.0.0.1",
        port : 3306,
        dialect : "mysql"
    }
)  

dotenv.config()

export const dbConnect = () => {
    sequelize.authenticate()
        .then(console.log('Successfully connected to the DB'))
        .catch(error => console.log(`Failed to connect : ${error}`))
}
