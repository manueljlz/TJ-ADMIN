import mysql from 'promise-mysql';
import keys from './keys'

//MÓDULO DE CONEXIÓN
//igual que connection pero ideal para prod

const pool = mysql.createPool(keys.database);

pool.getConnection().then(connection => {
    pool.releaseConnection(connection);
    console.log("DB is connect")
});

export default pool;