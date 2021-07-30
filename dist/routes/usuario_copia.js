"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const c_usuarios_1 = __importDefault(require("../class/c_usuarios"));
//import bcrypt from 'bcrypt';
const promesas_1 = __importDefault(require("../utils/promesas"));
const userRoutes = express_1.Router();
const c_usuario = new c_usuarios_1.default();
userRoutes.get('/prueba', (req, res) => {
    // let mi_encriptacion=bcrypt.hashSync(req.body.password, 10);
    // console.log(mi_encriptacion);
    // console.log("token",req.token)
    console.log(req.body);
    res.json({
        estado: "success",
        mensaje: "ok"
    });
});
// userRoutes.get('/login', async(req:Request, res:Response)=>{
//     const user = {
//         usuario: req.body.usuario,
//         password: req.body.password,
//     }
//     console.log(req.body);
//     console.log('Iniciando');
//     console.log(req.body.usuario);
//     console.log(req.body.password);
//     const datos_respuesta = await c_usuario.ValidarUsuario(user.usuario,user.password);
//     res.json({
//         mensaje: datos_respuesta,
//     })
// })
userRoutes.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const user = {
        usuario: req.body.usuario,
        password: req.body.password,
    };
    console.log(user.usuario);
    //return  res.json(await c_usuario.ValidarUsuario(user.usuario,user.password));
    const respuesta = yield c_usuario.ValidarUsuario(user.usuario, user.password);
    res.json(respuesta);
}));
userRoutes.put('/createUsuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Ingreso a Create');
    console.log(req.body);
    try {
        const user = {
            usuario: req.body.usuario,
            correo: req.body.correo,
            password: req.body.password
        };
        const respuesta = yield c_usuario.CrearUsuario(user.usuario, user.correo, user.password);
        res.json(respuesta);
        // console.log(user.usuario);
        //  await query("start transaction");
        //  const mi_pass=await c_usuario.ObtnerPassEncriptada(user.password);
        //  const consulta= await "insert into Inventario_Usuario values('"+user.usuario+"','"+user.correo+"','"+mi_pass +"')";
        //  const insertPersona:any = await query(consulta);
        //  await query("commit");
        //  res.json({estado: "success"}) 
    }
    catch (error) {
        const rollback = yield promesas_1.default("rollback");
        res.json({ estado: "error", mensaje: "error en createUsuario", data: error, rollabck: rollback });
    }
}));
exports.default = userRoutes;
