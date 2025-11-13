//? Variables de Entorno
require('dotenv').config();

//? Importar Expreses para crear el servidor 

const express = require('express');

//? Importa CORS para permitir comunicacion con frontend

const cors = require('cors');

//? App Express
const app = express();

//? Configurar Middlewares

app.use(cors());
app.use(express.json());

//? Ruta de prueba 

app.get('/', (req, res) => {
    res.json({ 
        message: `Servidor CDT funcionando`,
        status: `Active`
    });
});

//? Importar rutas de utenticacion 

const authRoutes = require ('./routes/authRoutes');

//? usar rutas de autenticacion 

app.use('/api/auth', authRoutes)

//? Iniciar el Servidor

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

