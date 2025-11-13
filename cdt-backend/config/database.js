//? Conexión postgreSQL

//? importar dependencias

const { Pool } = require('pg');

//? variables de entorno

require('dotenv').config();



//* pool conexions

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

//? Probar conexiones

pool.on('connect', () =>{
    console.log(`Conectado a postgreSQL`);
});

pool.on('error',(err)=>{
    console.log(`Eror de conexion a PostgreSQL: ${err}`);
});

module.exports = pool;