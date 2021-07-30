import {Router, Response, Request} from 'express';
import { envioElMail } from '../controllers/_mail';

const routerMail = Router();

// post   envia el mail
// http://localhost:3000/mail
routerMail.route('/mail').post(envioElMail);//Pasar el email
export default routerMail;