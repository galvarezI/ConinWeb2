const mysql = require('mysql2')
const {promisify} = require('util')
const { database } = require('./keys')



const pool = mysql.createPool(database)

pool.getConnection((err,connection)=>{

    if (err){
            if(err.code === 'PROTOCOL_CONNECTION_LOST'){
                console.error('DATABASE CONECTION WAS CLOSED')
            }
            if(err.code === 'ER_CON_COUNT_ERROR'){
                console.error('DATABASE HAS TOO MANY CONECTIONS')
            }
            if(err.code === 'ECONNREFUSED'){
                console.error('DATABASE CONECTION WAS REFUSED')
            }


            
    }

    if(connection) connection.release()
    console.log('DB is Connected')
    return

                
    

})


//convirtiendo de callbacks a promesas con promisify.....

pool.query = promisify(pool.query)
module.exports = pool
