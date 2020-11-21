import { createPool, PoolConnection } from "mysql";

import config from "./config";

const pool = createPool({
  host: config.DB.host,
  user: config.DB.user,
  password: config.DB.password,
  database: config.DB.database,
})

const getConnection = () : Promise<PoolConnection> => (
  new Promise((resolve, reject) => (
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }

      resolve(connection);
    })
  ))
)

const connect = async (execFunction: (connection: PoolConnection) => any) : Promise<any> => {
  const connection = await getConnection();

  let result;

  try {
    result = await execFunction(connection);
  } catch (err) {
    connection.release();

    throw err;
  }

  return result;
}

const transaction = async (connection: PoolConnection, func: (connection: PoolConnection) => any) : Promise<any> => {
  connection.beginTransaction();

  let result;
  try {
    result = await func(connection);
  } catch (err) {
    connection.rollback();

    throw err;
  }

  connection.commit();
  return result;
}

const query = async (connection: PoolConnection, sqlQuery: string, data?: Array<any> | Object): Promise<any> => 
  new Promise((resolve, reject) => {
    connection.query(sqlQuery, data, (err, result) => {
      if (err) {
        reject(err);
      }

      resolve(result);
    });
  })

export {
  pool,
  connect,
  transaction,

  query
}