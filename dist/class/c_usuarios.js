"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conexion_mssql_1 = __importDefault(require("../bin/conexion_mssql"));
const token_1 = require("../class/token");
const bcrypt_1 = __importDefault(require("bcrypt"));
class usuarios {
    constructor() { }
    ObtnerPassEncriptada(password) {
        let mi_encriptacion = bcrypt_1.default.hashSync(password, 10);
        console.log(mi_encriptacion);
        return bcrypt_1.default.hashSync(password, 10);
    }
    ValidarUsuario(usuario, password) {
        console.log('soy', usuario);
        console.log('mi pass', password);
        return new Promise((resolve, reject) => {
            conexion_mssql_1.default.connect((error) => {
                if (error) {
                    console.log('error en conexion a base datos', error);
                    reject(error);
                }
                else {
                    //es la contraseña ingresada por tecalado encriptada
                    // console.log(bcrypt.hashSync(password, 10));
                    const consulta = "select correo,password from Inventario_Usuario where usuario='" + usuario + "'";
                    console.log(consulta);
                    conexion_mssql_1.default.request().query(consulta, (err, result) => {
                        if (error) {
                            console.log('error en query', error);
                            reject('error en query' + error);
                        }
                        else {
                            console.log(result.recordsets[0].length);
                            if (result.recordsets[0].length > 0) {
                                console.log(result.recordsets[0]);
                                if (bcrypt_1.default.compareSync(password, result.recordsets[0][0].password)) {
                                    //return true
                                    console.log('usuario encontrado');
                                    console.log(result.recordsets[0][0].correo);
                                    //dentro de este token va a estar encriptado todos estos datos
                                    const tokenJwt = token_1.Token.getToken({
                                        usuario: usuario,
                                        correo: result.recordsets[0][0].correo
                                    });
                                    console.log(tokenJwt);
                                    // return res.json({
                                    //     estado:"success",
                                    //     mensaje: "usuario encontrado",
                                    //     data: result,
                                    //     token: tokenJwt
                                    // })
                                    return resolve({ estado: "success",
                                        mensaje: "usuario encontrado",
                                        data: result,
                                        token: tokenJwt
                                    });
                                }
                                else {
                                    //return false
                                    console.log('contraseña incorrecta ');
                                    return resolve({ estado: "success",
                                        mensaje: "contraseña incorrecta",
                                        data: result
                                    });
                                }
                            }
                            else {
                                console.log('Usuario no encontrado');
                                return resolve({ estado: "success",
                                    mensaje: "usuario no encontrado",
                                    data: result
                                });
                            }
                        }
                    });
                }
            });
        });
    }
    CrearUsuario(usuario, correo, password) {
        return new Promise((resolve, reject) => {
            conexion_mssql_1.default.connect((error) => {
                if (error) {
                    console.log({ estado: "error", mensaje: "error en conexion a base datos", data: error });
                    reject({ estado: "error", mensaje: "error en conexion a base datos", data: error });
                }
                else {
                    //es la contraseña ingresada por tecalado encriptada
                    // console.log(bcrypt.hashSync(password, 10));
                    let mi_encriptacion = bcrypt_1.default.hashSync(password, 10);
                    const consulta = "insert into Inventario_Usuario values('" + usuario + "','" + correo + "','" + mi_encriptacion + "')";
                    console.log(consulta);
                    conexion_mssql_1.default.request().query(consulta, (err, result) => {
                        if (error) {
                            console.log({ estado: "error", mensaje: "error en query", data: error });
                            reject({ estado: "error", mensaje: "error en query", data: error });
                        }
                        else {
                            console.log({ estado: "success",
                                mensaje: "usuario creado",
                                data: result
                            });
                            return resolve({ estado: "success",
                                mensaje: "usuario creado",
                                data: result
                            });
                        }
                    });
                }
            });
        });
    }
}
exports.default = usuarios;
