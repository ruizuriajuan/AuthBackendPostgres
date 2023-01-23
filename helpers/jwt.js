const jwt = require("jsonwebtoken");
const { Promise } = require("mongoose");


const generarJWT = (id, nombre) => {
    const payload = { id, nombre };

    return new Promise((resolve, reject) => {
        //solo funciona como callback
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log('Error en el jwt: ',err);
                reject(err);
            } else {
                resolve(token);
            }
        });

    });

}

module.exports = {
    generarJWT
}