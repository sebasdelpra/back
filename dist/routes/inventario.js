"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventario_controllers_1 = require("../controllers/inventario.controllers");
//import bcrypt from 'bcrypt';
const routerInventario = express_1.Router();
//post   insertar
//put    update
//get    obtner
//delete eliminar
// http://localhost:3000/usuarios
//routerUsuario.route('/login').post(ValidarUsuario);//Pasar: usuario y password
// routerUsuario.route('/create').post(verificarToken,createUsuario); //Pasar:usuario, password y correo
routerInventario.route('/').get(inventario_controllers_1.getInventarioAll); //no pasar nada
//routerInventario.route('/').get(verificarToken,getInventarioAll)//no pasar nada
// routerUsuario.route('/obtener').post(verificarToken,getUsuario);//debo pasarle el ID
// routerUsuario.route('/delete').delete(verificarToken,deleteUsuario);//debo pasarle el ID
// routerUsuario.route('/update').put(verificarToken,updateUsuario);//debo pasarle usuario y correo y obligar a loguearse de nuevo
exports.default = routerInventario;
