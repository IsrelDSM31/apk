const mysql = require("mysql2/promise");

const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'api',
    });

    console.log("Exito con la conexion a tu base de datos");
    return connection;
  } catch (error) {
    console.error("Error a la conexion de tu base de datos", error);
    throw error;
  }
};

module.exports = connectDB;




