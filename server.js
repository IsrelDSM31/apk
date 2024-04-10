const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const colors = require("colors");
const morgan = require("morgan");
const GasData = require("./models/GasData"); 

// DOTENV
dotenv.config();

// REST OBJECT
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Resto de las rutas existentes
app.use("/api/v1/auth", require("./routes/userRoutes"));

app.post('/api/v1/Gas-Data', async (req, res) => {
  try {
    const { cantidad_gas, fecha, hora } = req.body;
    // Aqui nos Crea una nueva instancia de GasData
    const newData = await GasData.create({ cantidad_gas, fecha, hora });
    res.status(201).json(newData);
  } catch (error) {
    console.error("Error al guardar los datos:", error);
    res.status(500).json({ message: "Error al guardar los datos" });
  }
});

app.get('/api/v1/Gas-Data', async (req, res) => {
  try {
    // Aqui Busca todos los registros de GasData
    const allData = await GasData.findAll();
    res.status(200).json(allData);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
    res.status(500).json({ message: "Error al obtener los datos" });
  }
});

// PORT
const PORT = process.env.PORT || 8080;

// listen
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`.bgGreen.white);
});