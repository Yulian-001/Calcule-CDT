//? Rutas de autenticacion 
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const pool = require('../config/database'); 

 //? Register user
 
 const register = async (req, res) => {
    try{

        
        //? Datos del formulario
        const { email, password, name } = req.body;

        //? Validar Campos
        if( !email || !password || !name){
            return res.status(400).json({
                error: `Email, contraseña son requeridos`
            });
        }

        //?Verificar E-mail existente

        const userExists = await pool.query(
            `SELECT id FROM users WHERE email = $1`, [email]
        );
    
    //? Si hay E-mails existentes
    if (userExists.rows.length > 0) {
        return res.status(409).json({
            error: `Este E-mail ya está registrado`
        });
    }
    //? Hashear Contraseñas
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    //? Guardar Usuarios en ls BD
    const newUser = await pool.query(
        `INSERT INTO users (email, password_hash, name)
        VALUES ($1, $2, $3)
        RETURNING id, email, name, created_at`,
        [email, passwordHash, name]
    );

    //? Generar TOKEN JWT
     console.log('🔐 JWT_SECRET:', process.env.JWT_SECRET ? '***' : 'UNDEFINED');

    const token =jwt.sign(
        {
            userId: newUser.rows[0].id,
            email: newUser.rows[0].email
        },
        process.env.JWT_SECRET,
        { expiresIn:  `24h`}
    );

    //? Enviar Respuesta al Front

    res.status(201).json({
        success: true,
        message: `Usuario registrado exitosamente`,
        token: token,
        user:{
            id: newUser.rows[0].id,
            email: newUser.rows[0].email,
            name: newUser.rows[0].name,
            created_at: newUser.rows[0].created_at
        }
    });

} catch (error) {
    console.error(`Erorr en el registro: ${error}`);
    res.status(500).json({
        error: `Error interno del servidor`
    });
}
};

const login = async (req, res) =>{
    try{
        //? obtener credenciales
        const { email, password } = req.body;

        //? Validar campos 
        if(!email || !password){
            return res.status(400).json({
                error: `E-mail y contraseña son requeridos`
            });
        }

        //? Buscar usuario por email
        const userResult = await pool.query(
            `SELECT * FROM users WHERE email = $1 `,
            [email]
        );

        //? User existente en el login
        if(userResult.rows.length === 0) {
            return res.status(401).json({
                error: `Credenciales incorrectas`
            })
        }
        //? Comparar contraseñas (bcrypt)
        
        const user = userResult.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if(!isPasswordValid){
            return res.status(401).json({
                error: `Credenciales incorrectas`
            });
        }

        //? Generar token JWT

        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {   expiresIn: '24h' }
        );

        //? Enviar Respuesta

        res.json({
            success: true,
            message: 'Ingreso exitoso',
            token: token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                created_at: user.created_at
            }
        });

     } catch (error) {
        console.error(`Error al entrar: ${error}`);
            res.status(500).json({
                error: `Error interno del servidor`
            });
        }
    
    };

    module.exports = {
    register,
    login
};

