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
exports.newPassword = exports.reseteoUsuario = exports.updateUsuario = exports.deleteUsuario = exports.createUsuario = exports.getUsuario = exports.leerUsuarios = exports.validarUsuario = void 0;
const conexion_mssql_1 = __importDefault(require("../bin/conexion_mssql"));
const token_1 = require("../class/token");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//FUNCIONA routerUsuario.route('/login').post(ValidarUsuario);
//PASAR  usuario y password0
function validarUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //   const consulta=await "select correo,password from Usuario where usuario='"+req.body.usuario+"'";
            const consulta = (yield "select ID_Usuario, usuario, nombre, apellido, tipoDocumento, numeroDocumento, correo, password from Usuario where usuario='") + req.body.usuario + "'";
            yield conexion_mssql_1.default.request().query(consulta, (err, result) => {
                if (err) {
                    //  console.log('error en query',err);
                    return res.json('error en query' + err);
                }
                else {
                    //  console.log(result.recordsets[0].length);
                    if (result.recordsets[0].length > 0) {
                        //   console.log(result.recordsets[0]);
                        if (bcrypt_1.default.compareSync(req.body.password, result.recordsets[0][0].password)) {
                            //return true
                            // console.log('usuario encontrado');
                            // console.log(result.recordsets[0][0].correo);
                            //dentro de este token va a estar encriptado todos estos datos
                            const tokenJwt = token_1.Token.getToken({
                                usuario: req.body.usuario,
                                correo: result.recordsets[0][0].correo
                            });
                            // console.log(tokenJwt);
                            return res.json({ estado: "success",
                                mensaje: "usuario encontrado",
                                data: result.recordsets[0],
                                token: tokenJwt
                            });
                        }
                        else {
                            //return false
                            console.log('contraseña incorrecta ');
                            return res.json({ estado: "success",
                                mensaje: "contraseña incorrecta",
                                data: result
                            });
                        }
                    }
                    else {
                        console.log('Usuario no encontrado');
                        return res.json({ estado: "success",
                            mensaje: "usuario no encontrado",
                            data: result
                        });
                    }
                }
            });
        }
        catch (error) {
            res.json({ estado: "error", data: error });
        }
    });
}
exports.validarUsuario = validarUsuario;
// //FUNCIONA routerUsuario.route('/login').post(ValidarUsuario);
// //PASAR  usuario y password
// export async function validarUsuario(req:Request, res: Response){
//    try{
//          const consulta=await "select ID_Usuario, usuario, nombre, apellido, tipoDocumento, numeroDocumento from Usuario where usuario='"+req.body.usuario+"'";
//          await   conexion_mssql.request().query(consulta, (err:any, result:any) => {
//                      if(err){
//                         //  console.log('error en query',err);
//                          return res.json('error en query'+err);
//                      }
//                      else{
//                         //  console.log(result.recordsets[0].length);
//                          if(result.recordsets[0].length>0)
//                          {
//                            //   console.log(result.recordsets[0]);
//                              if(bcrypt.compareSync(req.body.password,result.recordsets[0][0].password)){
//                                  // console.log('usuario encontrado');
//                                  // console.log(result.recordsets[0][0].correo);
//                                  //dentro de este token va a estar encriptado todos estos datos
//                                  const tokenJwt=Token.getToken({
//                                      usuario:req.body.usuario,
//                                      correo:result.recordsets[0][0].correo
//                                  })
//                                  // console.log(tokenJwt);
//                                  return res.json({estado:"success",
//                                      mensaje: "usuario encontrado",
//                                      data: result.recordsets[0],
//                                      token: tokenJwt
//                                  });
//                              }
//                              else{
//                                  //return false
//                                  // console.log('contraseña incorrecta ');
//                                  return res.json({estado:"success",
//                                  mensaje: "contraseña incorrecta",
//                                  data: result
//                              });                                 
//                              }                             
//                          }
//                          else{
//                            //   console.log('Usuario no encontrado');
//                              return res.json({estado:"success",
//                              mensaje: "usuario no encontrado",
//                              data: result
//                          });
//                          }
//                      }
//                  })
//    } 
//     catch(error){      
//       res.json({estado:"error", data:error});
//   } 
// }
//FUNCIONA RUTA '/leerUsuarios' METODO get 
function leerUsuarios(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('export async function leerUsuarios(req:Request, res: Response){');
        const consulta = yield 'select * from inventario.dbo.usuario ';
        const usuarios = yield conexion_mssql_1.default.request().query(consulta);
        // console.log(usuarios.recordsets[0]);
        return res.json(usuarios.recordsets[0]);
    });
}
exports.leerUsuarios = leerUsuarios;
//FUNCIONA RUTA '/obtener' METODO post 
//debo pasarle el ID
function getUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const consulta = (yield 'select * from inventario.dbo.usuario where id=') + req.body.id;
        const usuarios = yield conexion_mssql_1.default.request().query(consulta);
        return res.json(usuarios.recordsets[0]);
    });
}
exports.getUsuario = getUsuario;
//Funciona routerUsuario.route('/create').post(createUsuario); 
function createUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const consulta = "select * from inventario.dbo.Usuario WHERE correo = '" + req.body.correo + "'";
        yield conexion_mssql_1.default.request().query(consulta, (err, result) => __awaiter(this, void 0, void 0, function* () {
            if (result.recordsets[0].length > 0) {
                return res.json({ estado: "success",
                    mensaje: "YA EXISTE ESTE CORREO... ingresar otro" });
            }
            else {
                try {
                    let psw = bcrypt_1.default.hashSync(req.body.password, 10);
                    let pepe = "INSERT INTO  inventario.dbo.Usuario VALUES ('" + req.body.usuario + "'," +
                        "'" + req.body.nombre + "'," +
                        "'" + req.body.apellido + "'," +
                        "'" + req.body.tipoDocumento + "'," +
                        "'" + req.body.numeroDocumento + "'," +
                        "'" + req.body.correo + "'," +
                        "'" + psw + "'," +
                        "'')";
                    yield conexion_mssql_1.default.request().query(pepe);
                    return res.json({ estado: "success",
                        mensaje: "CUENTA creada"
                    });
                }
                catch (error) {
                    res.json({ estado: "error", data: error });
                }
            }
        }));
    });
}
exports.createUsuario = createUsuario;
function deleteUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const usuarios = yield conexion_mssql_1.default.executeQuery('DELETE FROM inventario.dbo.usuario WHERE id = @id', [{
                    name: 'id',
                    type: 'Int',
                    value: id
                }]);
            // console.log(usuarios.values)
            return res.json({
                message: 'USUARIO deleted'
            });
        }
        catch (error) {
            res.json({ estado: "error", data: error });
        }
    });
}
exports.deleteUsuario = deleteUsuario;
function updateUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.body.ID_Usuario;
        let update = " UPDATE inventario.dbo.usuario SET [usuario]         = '" + req.body.usuario + "'," +
            " [nombre]          = '" + req.body.nombre + "'," +
            " [apellido]        = '" + req.body.apellido + "'," +
            " [tipoDocumento]   = '" + req.body.tipoDocumento + "'," +
            " [numeroDocumento] = '" + req.body.numeroDocumento + "' " +
            " WHERE ID_Usuario  =  " + req.body.ID_Usuario;
        try {
            console.log(update);
            const pepe = yield conexion_mssql_1.default.request().query(update, (err, result) => {
                return res.json({ estado: "success",
                    mensaje: "CUENTA modificada" });
            });
        }
        catch (error) {
            res.json({ estado: "error", data: error });
        }
    });
}
exports.updateUsuario = updateUsuario;
//FUNCIONA routerUsuario.route('/reseteo').post(reseteoUsuario);
//PASAR  email
function reseteoUsuario(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //primero veo si existe el correo 
            const consulta = "select * from inventario.dbo.Usuario WHERE correo = '" + req.body.email + "'";
            yield conexion_mssql_1.default.request().query(consulta, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (result.recordsets[0].length > 0) {
                    let seed = "esteEsElSeed";
                    let caducidad = "10m";
                    //para generar el token
                    let xToken = "http://localhost:4200/new-password/codigo:" + jsonwebtoken_1.default.sign({ mail: req.body.email }, seed, { expiresIn: caducidad });
                    console.log(xToken);
                    const update = " UPDATE inventario.dbo.Usuario SET [reset]    = '" + xToken + "' " +
                        "  WHERE [correo]   = '" + req.body.email + "'";
                    const pepe = yield conexion_mssql_1.default.request().query(update, (err, result) => {
                        console.log(update);
                        return res.json({ estado: "success",
                            mensaje: "CUENTA reseteada (revisa tu correo)",
                            token: xToken });
                    });
                }
                else {
                    return res.json({ estado: "success",
                        mensaje: "CORREO NO ENCONTRADO" });
                }
            }));
        }
        catch (error) {
            console.log('no funco');
            res.json({ estado: "error", data: error });
        }
    });
}
exports.reseteoUsuario = reseteoUsuario;
//FUNCIONA routerUsuario.route('/new-password').post(newPassword);
//PASAR  email
function newPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let mail = req.body.newMailDesencriptado;
        try {
            //primero veo si existe el correo 
            const consulta = "select * from inventario.dbo.Usuario WHERE correo = '" + mail + "'";
            yield conexion_mssql_1.default.request().query(consulta, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (result.recordsets[0].length > 0) {
                    //Si encuentra lo modifica
                    let psw = bcrypt_1.default.hashSync(req.body.newPassword, 10);
                    const update = " UPDATE inventario.dbo.Usuario SET [password] = '" + psw + "', " +
                        " [reset]    = '' " +
                        " WHERE correo = '" + mail + "'";
                    console.log(update);
                    const pepe = yield conexion_mssql_1.default.request().query(update, (err, result) => {
                        return res.json({ estado: "success",
                            mensaje: "NUEVO PASSWORD" });
                    });
                }
                else {
                    return res.json({ estado: "success",
                        mensaje: "NO SE ENCONTRO EL CORREO" });
                }
            }));
        }
        catch (error) {
            console.log('no funco');
            res.json({ estado: "error", data: error });
        }
    });
}
exports.newPassword = newPassword;
