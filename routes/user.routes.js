const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();
const { usuariosGet,loginUsuario,revalidarToken, crearUsuario, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/user.controller');
const { validarToken } = require('../middlewares/validarJwt');

router.post('/new',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('correo','El correo es obligratorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength({min:6}),
    validarCampos
], crearUsuario);
router.post('/', [
    check('correo','El correo es obligratorio').isEmail(),
    check('password','La contraseña es obligatoria').isLength({min:6}),
    validarCampos
],loginUsuario);
router.get('/', usuariosGet);
router.get('/renew',[validarToken], revalidarToken);
router.put('/', usuariosPut);
router.put('/:id', usuariosPut);
router.patch('/', usuariosPatch);
router.delete('/', usuariosDelete);


module.exports = router;