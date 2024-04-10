const { Sequelize, DataTypes } = require('sequelize');

// Crear la instancia de Sequelize
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: '154.56.47.52',
  port: 3306,
  username: 'u196388150_SVRA',
  password: 'JY474#*P&oZ58Y', 
  database: 'u196388150_SVRA',
});

// Definir el modelo para los usuarios
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
});

// Se Sincroniza el modelo con la base de datos (crear la tabla si no existe)
(async () => {
  try {
    await User.sync();
    console.log('Modelo de usuario sincronizado correctamente con la base de datos');
  } catch (error) {
    console.error('Error al sincronizar el modelo de usuario con la base de datos:', error);
  }
})();

module.exports = User;




