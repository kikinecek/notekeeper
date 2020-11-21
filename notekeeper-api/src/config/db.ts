const {
  MYSQL_DB_HOST,
  MYSQL_DB_PORT,
  MYSQL_DB_USER,
  MYSQL_DB_PASSWORD,
  MYSQL_DB_DATABASE  
} = process.env;

const config =  {
  host: MYSQL_DB_HOST,
  port: MYSQL_DB_PORT,
  user: MYSQL_DB_USER,
  password: MYSQL_DB_PASSWORD,
  database: MYSQL_DB_DATABASE
};

export default config;