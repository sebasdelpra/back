import {Router, Response, Request} from 'express';
import  { createUsuario, 
          deleteUsuario, 
          updateUsuario, 
          validarUsuario,
          getUsuario,
          newPassword,
          leerUsuarios,
          reseteoUsuario} from '../controllers/usuario.controllers';

import { verificarToken } from '../middlewares/authentication';

const routerUsuario = Router();

// post   insertar
// put    update
// get    obtner
// delete eliminar
// http://localhost:3000/usuario
routerUsuario.route('/login').post(validarUsuario);//Pasar: usuario y password
// routerUsuario.route('/create').post(verificarToken,createUsuario); //Pasar:usuario, password y correo
routerUsuario.route('/create').post(createUsuario); //Pasar:usuario, password y correo
routerUsuario.route('/obtener').post(verificarToken,getUsuario);//debo pasarle el ID
routerUsuario.route('/delete').delete(verificarToken,deleteUsuario);//debo pasarle el ID
routerUsuario.route('/update').put(updateUsuario);//debo pasarle ID_usuario 
routerUsuario.route('/reseteo').post(reseteoUsuario);//Pasar el email
routerUsuario.route('/leerUsuarios').get(leerUsuarios);//obtengo todo
routerUsuario.route('/new-password').post(newPassword);//Pasar el password el mail saca de la columna reset que vino del correo
export default routerUsuario;