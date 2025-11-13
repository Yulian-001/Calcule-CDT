//* Rutas

//? Importar dependecias

const express = require('express');
const { register, login } = require('../controllers/authController');


//? Creación del router

const router = express.Router();

//? Definir rutas

// POST/ api / auth/ register -registrar nuevo usuario

router.post('/register', register);
router.post('/login', login);

//? Exportar router

module.exports = router;