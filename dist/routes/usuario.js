"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_controllers_1 = require("../controllers/usuario.controllers");
const authentication_1 = require("../middlewares/authentication");
const routerUsuario = express_1.Router();
// post   insertar
// put    update
// get    obtner
// delete eliminar
// http://localhost:3000/usuario
routerUsuario.route('/login').post(usuario_controllers_1.validarUsuario); //Pasar: usuario y password
// routerUsuario.route('/create').post(verificarToken,createUsuario); //Pasar:usuario, password y correo
routerUsuario.route('/create').post(usuario_controllers_1.createUsuario); //Pasar:usuario, password y correo
routerUsuario.route('/obtener').post(authentication_1.verificarToken, usuario_controllers_1.getUsuario); //debo pasarle el ID
routerUsuario.route('/delete').delete(authentication_1.verificarToken, usuario_controllers_1.deleteUsuario); //debo pasarle el ID
routerUsuario.route('/update').put(usuario_controllers_1.updateUsuario); //debo pasarle ID_usuario 
routerUsuario.route('/reseteo').post(usuario_controllers_1.reseteoUsuario); //Pasar el email
routerUsuario.route('/leerUsuarios').get(usuario_controllers_1.leerUsuarios); //obtengo todo
routerUsuario.route('/new-password').post(usuario_controllers_1.newPassword); //Pasar el password el mail saca de la columna reset que vino del correo
exports.default = routerUsuario;
