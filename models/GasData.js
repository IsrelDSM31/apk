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

// Definir el modelo para los datos de gas
const GasData = sequelize.define('GasData', {
  cantidad_gas: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

// Sincronizar el modelo con la base de datos (crear la tabla si no existe)
(async () => {
  try {
    await sequelize.sync();
    console.log('Modelo sincronizado correctamente con la base de datos');
  } catch (error) {
    console.error('Error al sincronizar el modelo con la base de datos:', error);
  }
})();

module.exports = GasData;