const { request,response } = require("express");
const jwt = require("jsonwebtoken");

const validarToken = (req = request, res = response, next) => {
    const token  = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok:false,
            msg: 'error en el token'
        })
    }

    try {
        const {id,nombre} = jwt.verify(token,process.env.SECRET_JWT_SEED);
        console.log('Verificar:::',id,nombre);
        //pasaremos la req de esta midleware al controller
        req.id=id;
        req.nombre = nombre;
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token invalido'
        })
    }
    next();
}

module.exports = {
    validarToken
} 