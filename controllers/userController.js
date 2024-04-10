const JWT = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel');
const {expressjwt: jwt} = require ('express-jwt');

//middleware
const requireSingIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Validación
    if (!name) {
      return res.status(400).send({
        success: false,
        message: 'Se requiere el Nombre'
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: 'Se requiere el Email'
      });
    }
    if (!password || password.length < 6) { 
      return res.status(400).send({
        success: false,
        message: 'La contraseña es obligatoria y debe tener al menos 6 caracteres' 
      });
    }
    // Verificar si el usuario ya está registrado
    const existingUser = await userModel.findOne({ where: { email: email } });
    if(existingUser) {
      return res.status(400).send({
        success: false,
        message: 'Usuario ya registrado con este correo electrónico'
      });
    }
// hashed password 
const hashedPassword = await hashPassword(password);
// Crear un nuevo usuario y guardarlo en la base de datos
const user = await userModel.create({
  name: name,
  email: email,
  password: hashedPassword
});
// Se Enviara una respuesta de éxito
return res.status(201).send({
  success: true,
  message: 'Registro exitoso. Por favor Iniciar sesión'
});


  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error al registrar API',
      error,
    });
  }
};

// login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validación
    if (!email || !password) { 
      return res.status(500).send({
        success: false,
        message: 'Por favor proporcione correo electrónico y contraseña' 
      });
    }
    // find user 
    const user= await userModel.findOne({ where: { email} });
    if(!user){
      return res.status(500).send({
        success:false,
        message: 'Usuario no encontrad@'
      })
    }
    // match password 
    const match = await comparePassword( password, user.password)
    if(!match) {
      return res.status(500).send({
        success:false,
        message: 'usuario o contraseña invalido'
      })
    }
// TOKEN JWT 
const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
  expiresIn: "7d",
});

// Eliminar la propiedad password del objeto de usuario
user.password = undefined;

// Enviar la respuesta con el token JWT y el usuario
res.status(200).send({
  success: true,
  message: 'Iniciar sesión exitosamente',
  token,
  user
});

} catch (error) {
  console.log(error); 
  return res.status(500).send({
    success: false,
    message: 'error en la API de inicio de sesión',
    error: error 
  });
}
};

// Update user
const updateUserController = async (req, res) => {
  try {
    const { name, password, email } = req.body;

    // Find user
    let user = await userModel.findOne({ where: { email: email } });

    // Check if user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Password validation
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: 'La contraseña es obligatoria y debe tener 6 caracteres'
      });
    }

    // Hash password if provided
    const hashedPassword = password ? await hashPassword(password) : undefined;

    // Update user
    await user.update({
      name: name || user.name,
      password: hashedPassword || user.password
    });

    res.status(200).send({
      success: true,
      message: 'Actualización de perfil Por favor inicie sesión'
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error en la API de actualización del usuario',
      error
    });
  }
};

module.exports = { requireSingIn, registerController, loginController, updateUserController };


