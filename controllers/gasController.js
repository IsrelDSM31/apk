const GasData = require('../models/GasData');

const gasController = async (req, res) => {
  try {
    const { cantidad_gas, fecha, hora } = req.body;

    // Validar la información
    if (!cantidad_gas || !fecha || !hora) {
      return res.status(400).json({ success: false, message: 'Cantidad de gas, fecha y hora son requeridos' });
    }
    
    // Crear un nuevo registro de datos de gas
    const newGasData = await GasData.create({ cantidad_gas, fecha, hora });

    // Enviar una respuesta exitosa si se han guardado los datos
    return res.status(201).json({ success: true, message: 'Datos de gas agregados correctamente', data: newGasData });
  } catch (error) {
    console.error('Error al agregar datos de gas:', error);
    return res.status(500).json({ success: false, message: 'Error al agregar datos de gas' });
  }
};

module.exports = { gasController };

