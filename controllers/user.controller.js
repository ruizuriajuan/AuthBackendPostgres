const { request, response, json } = require('express');
const { Usuario } = require('../models/Usuario');
const bcript = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');




const crearUsuario = async (req = request, res = response) => {
    const { nombre, correo, password } = req.body;
    try {
        //Verificar correo repetido
        let usuario = await Usuario.findOne({
            where: { correo: correo },
        });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese correo'
            });
        }

        //Hashear la contraseña
        const salt = await bcript.genSaltSync(10);
        req.body.password = await bcript.hashSync(password, salt);

        //Crear usuario con el modelo
        usuario = await Usuario.create(req.body);

        //Generar el JWT
        const token = await generarJWT(usuario.id, nombre);

        return res.status(201).json({
            ok: true,
            uid: usuario.id,
            token
        })


    } catch (error) {
        console.log("Error al crear usuario: ", error);
        res.status(500).json({
            ok: false,
            msg: 'Error de sistema, comuniquese con el administrador',
        });
    }
}
const usuariosGet = (req = request, res = response) => {
    const { nombre = 'No name', apiKey, page = 1 } = req.query;

    res.json({
        msg: 'get API - usuariosGet',
        name,
        apiKey,
        page,
    });
}


const loginUsuario = async (req = request, res = response) => {
    const { correo, password } = req.body;
    console.log(correo, password);
    console.log(Usuario);
    try {
        let dbUser = await Usuario.findOne({
            where: { correo: correo },
        });
        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales invalidas'
            });
        }
        const validPass = bcript.compareSync(password, dbUser.password);
        if (!validPass) {
            return res.status(400).json({
                ok: false,
                msg: 'Pasword incorrecto.'
            });
        }
        //Generar el JWT
        const token = await generarJWT(dbUser.id, dbUser.nombre);
        return res.json({
            ok: true,
            uid: dbUser.id,
            nombre: dbUser.nombre,
            correo: dbUser.correo,
            token
        });


    } catch (error) {
        console.log("Error login usuario: ", error);
        res.status(500).json({
            ok: false,
            msg: 'Error de sistema(login), comuniquese con el administrador',
        });
    }

    res.json({
        ok: true,
        msg: 'get API - loginUsuario',

    });
}

const revalidarToken = async (req = request, res = response) => {
    const { id, nombre } = req;
    let dbUser = await Usuario.findOne({
        where: { id_usuario: id },
    });
    //Generar el JWT
    const token = await generarJWT(id, nombre);
    return res.json({
        ok: true,
        msg: 'token renovado',
        uid: dbUser.id,
        nombre: dbUser.nombre,
        correo: dbUser.correo,
        token
    });
}

const usuariosPut = (req, res = response) => {
    const { id } = req.params;

    res.json({
        msg: 'put API - usuariosPut',
        id
    });
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usuariosPatch'
    });
}
const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - usuariosDelete'
    });
}


module.exports = {
    usuariosGet,
    revalidarToken,
    loginUsuario,
    crearUsuario,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}