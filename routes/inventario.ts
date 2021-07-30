import {Router, Response, Request} from 'express';
import  { getInventarioAll} from '../controllers/inventario.controllers' ;
    // createUsuario, 
    // deleteUsuario, 
    // updateUsuario, 
    // ValidarUsuario,getUsuario} from '../controllers/usuario.controllers';
import { verificarToken } from '../middlewares/authentication';
//import bcrypt from 'bcrypt';
const routerInventario = Router();

//post   insertar
//put    update
//get    obtner
//delete eliminar
// http://localhost:3000/usuarios
 //routerUsuario.route('/login').post(ValidarUsuario);//Pasar: usuario y password
// routerUsuario.route('/create').post(verificarToken,createUsuario); //Pasar:usuario, password y correo
routerInventario.route('/').get(getInventarioAll)//no pasar nada
//routerInventario.route('/').get(verificarToken,getInventarioAll)//no pasar nada
// routerUsuario.route('/obtener').post(verificarToken,getUsuario);//debo pasarle el ID
// routerUsuario.route('/delete').delete(verificarToken,deleteUsuario);//debo pasarle el ID
// routerUsuario.route('/update').put(verificarToken,updateUsuario);//debo pasarle usuario y correo y obligar a loguearse de nuevo

export default routerInventario;