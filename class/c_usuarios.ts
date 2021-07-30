import conexion_mssql from '../bin/conexion_mssql';
import {Token} from '../class/token';
import bcrypt from 'bcrypt';
export default class usuarios {
    constructor(){}
    ObtnerPassEncriptada(password:string){
        let mi_encriptacion=bcrypt.hashSync(password, 10);
        console.log(mi_encriptacion);
        return bcrypt.hashSync(password, 10);
    }
     ValidarUsuario(usuario:string, password:string):any{
        console.log('soy',usuario);
        console.log('mi pass',password);
         return new Promise((resolve,reject)=>{
             conexion_mssql.connect((error:any)=>{
                if(error){
                    console.log('error en conexion a base datos',error);
                    reject(error);
                }
                else
                {
                    //es la contraseña ingresada por tecalado encriptada
                   // console.log(bcrypt.hashSync(password, 10));
                            const consulta="select correo,password from Inventario_Usuario where usuario='"+usuario+"'";
                            console.log(consulta);
                            conexion_mssql.request().query(consulta, (err:any, result:any) => {
                            if(error){
                                console.log('error en query',error);
                                reject('error en query'+error);
                            }
                            else{
                                console.log(result.recordsets[0].length);
                                if(result.recordsets[0].length>0)
                                {
                                    console.log(result.recordsets[0]);
                                    if(bcrypt.compareSync(password,result.recordsets[0][0].password)){
                                        //return true
                                        console.log('usuario encontrado');
                                        console.log(result.recordsets[0][0].correo);
                                        //dentro de este token va a estar encriptado todos estos datos
                                        const tokenJwt=Token.getToken({
                                            usuario:usuario,
                                            correo:result.recordsets[0][0].correo
                                        })
                                        console.log(tokenJwt);
                                        // return res.json({
                                        //     estado:"success",
                                        //     mensaje: "usuario encontrado",
                                        //     data: result,
                                        //     token: tokenJwt
                                        // })
                                    
                                    return resolve({estado:"success",
                                            mensaje: "usuario encontrado",
                                            data: result,
                                            token: tokenJwt
                                        });
                                    }
                                    else{
                                        //return false
                                        console.log('contraseña incorrecta ');
                                        return resolve({estado:"success",
                                        mensaje: "contraseña incorrecta",
                                        data: result
                                    });
                                        
                                    }
                                    
                                }
                                else{
                                    console.log('Usuario no encontrado');
                                    return resolve({estado:"success",
                                    mensaje: "usuario no encontrado",
                                    data: result
                                });
                                }
                                
                            }
                        })
                    }
            
                })
     })
 }
 CrearUsuario(usuario:string,correo:string, password:string):any{
     return new Promise((resolve,reject)=>{
         conexion_mssql.connect((error:any)=>{
            if(error){
                console.log({estado:"error",mensaje: "error en conexion a base datos",data: error})
                reject({estado:"error",mensaje: "error en conexion a base datos",data: error});
            }
            else
            {
                //es la contraseña ingresada por tecalado encriptada
               // console.log(bcrypt.hashSync(password, 10));
                        let mi_encriptacion=bcrypt.hashSync(password, 10);
                        const consulta="insert into Inventario_Usuario values('"+usuario+"','"+correo+"','"+mi_encriptacion+"')";
                        console.log(consulta);
                        conexion_mssql.request().query(consulta, (err:any, result:any) => {
                        if(error){
                            console.log({estado:"error",mensaje: "error en query",data: error});
                            reject({estado:"error",mensaje: "error en query",data: error});
                        }
                        else{
                            console.log({estado:"success",
                                        mensaje: "usuario creado",
                                        data: result
                            });
                            return resolve({estado:"success",
                            mensaje: "usuario creado",
                            data: result
                            });
                        }
                    })
            }
        
    })
 })
}
}