import { usuario } from '../interfaces/usuario.interfaces';
import conexion_mssql from '../bin/conexion_mssql';
import {Token} from '../class/token';
import bcrypt from 'bcrypt';
import { Router, Request, Response } from 'express';
import { token } from 'morgan';
import jwt from 'jsonwebtoken';


//FUNCIONA routerUsuario.route('/login').post(ValidarUsuario);
//PASAR  usuario y password0
export async function validarUsuario(req:Request, res: Response){
   try{
       //   const consulta=await "select correo,password from Usuario where usuario='"+req.body.usuario+"'";
         const consulta = await "select ID_Usuario, usuario, nombre, apellido, tipoDocumento, numeroDocumento, correo, password from Usuario where usuario='"+req.body.usuario+"'";
         await   conexion_mssql.request().query(consulta, (err:any, result:any) => {
                     if(err){
                        //  console.log('error en query',err);
                         return res.json('error en query'+err);
                     }
                     else{
                        //  console.log(result.recordsets[0].length);
                         if(result.recordsets[0].length>0)
                         {
                           //   console.log(result.recordsets[0]);
                             if(bcrypt.compareSync(req.body.password,result.recordsets[0][0].password)){
                                 //return true
                                 // console.log('usuario encontrado');
                                 // console.log(result.recordsets[0][0].correo);
                                 //dentro de este token va a estar encriptado todos estos datos
                                 const tokenJwt=Token.getToken({
                                     usuario:req.body.usuario,
                                     correo:result.recordsets[0][0].correo
                                 })
                                 // console.log(tokenJwt);
                                 return res.json({estado:"success",
                                     mensaje: "usuario encontrado",
                                     data: result.recordsets[0],
                                     token: tokenJwt
                                 });
                             }
                             else{
                                 //return false
                                 console.log('contraseña incorrecta ');
                                 return res.json({estado:"success",
                                 mensaje: "contraseña incorrecta",
                                 data: result
                             });                                 
                             }                             
                         }
                         else{
                             console.log('Usuario no encontrado');
                             return res.json({estado:"success",
                             mensaje: "usuario no encontrado",
                             data: result
                         });
                         }
                     }
                 })
   } 
    catch(error){      
      res.json({estado:"error", data:error});
  } 
}
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

export async function leerUsuarios(req:Request, res: Response){
   console.log('export async function leerUsuarios(req:Request, res: Response){');
   const consulta = await 'select * from inventario.dbo.usuario ' ;
   const usuarios = await conexion_mssql.request().query(consulta);   
   // console.log(usuarios.recordsets[0]);
   return res.json(usuarios.recordsets[0]);
}


//FUNCIONA RUTA '/obtener' METODO post 
//debo pasarle el ID
export async function getUsuario(req:Request, res: Response){
   const consulta = await 'select * from inventario.dbo.usuario where id='+req.body.id;
   const usuarios = await conexion_mssql.request().query(consulta);
   return res.json(usuarios.recordsets[0]);
}

//Funciona routerUsuario.route('/create').post(createUsuario); 
export async function createUsuario(req: Request, res: Response) {
   const consulta = "select * from inventario.dbo.Usuario WHERE correo = '"+req.body.correo+"'"    
   await conexion_mssql.request().query(consulta, async (err:any, result:any) => {
     if(result.recordsets[0].length>0)
     {     
         return res.json({estado:"success",
                     mensaje: "YA EXISTE ESTE CORREO... ingresar otro"});
     }
      else
     {
     try{            
            let psw = bcrypt.hashSync(req.body.password, 10) ;
            let pepe = "INSERT INTO  inventario.dbo.Usuario VALUES ('" + req.body.usuario        + "'," +
                                                                   "'" + req.body.nombre          + "'," + 
                                                                   "'" + req.body.apellido        + "'," +
                                                                   "'" + req.body.tipoDocumento   + "'," +
                                                                   "'" + req.body.numeroDocumento + "'," +                                                    
                                                                   "'" + req.body.correo          + "'," +
                                                                   "'" + psw                      + "'," +
                                                                   "'')"; 
            
            await conexion_mssql.request().query(pepe)
                                       return res.json({estado:"success",
                                       mensaje: "CUENTA creada"
                  });
         } 
         catch(error){                  
            res.json({estado:"error", data:error});
      }
    } 
   })
}
   



export async function deleteUsuario(req: Request, res: Response)  {
   const id = req.params.id;
   try { 
      const usuarios = await conexion_mssql.executeQuery('DELETE FROM inventario.dbo.usuario WHERE id = @id',
      [{
         name: 'id',
         type: 'Int',
         value: id
      }]) 

      // console.log(usuarios.values)
      return res.json({
         message: 'USUARIO deleted'
      });
   }
catch(error){   
   res.json({estado:"error", data:error});
   }
}
    

export async function updateUsuario(req: Request, res: Response)  {
   
   const id = req.body.ID_Usuario;
   
   let update =  " UPDATE inventario.dbo.usuario SET [usuario]         = '" + req.body.usuario         + "'," +                                            
                                                   " [nombre]          = '" + req.body.nombre          + "'," + 
                                                   " [apellido]        = '" + req.body.apellido        + "'," + 
                                                   " [tipoDocumento]   = '" + req.body.tipoDocumento   + "'," + 
                                                   " [numeroDocumento] = '" + req.body.numeroDocumento + "' " +                                                 
                                                   " WHERE ID_Usuario  =  " + req.body.ID_Usuario  ;

   try{      
      
   console.log(update);
            const pepe = await conexion_mssql.request().query(update, (err:any, result:any) => {
        
            return res.json({estado:"success",
                             mensaje: "CUENTA modificada"});
            })

   } 
 catch(error){      
     res.json({estado:"error", data:error});
 }
}

//FUNCIONA routerUsuario.route('/reseteo').post(reseteoUsuario);
//PASAR  email
export async function reseteoUsuario(req: Request, res: Response)  { 
  
    try{  
       //primero veo si existe el correo 
       const consulta = "select * from inventario.dbo.Usuario WHERE correo = '"+req.body.email+"'"     
       
       await conexion_mssql.request().query(consulta, async (err:any, result:any) => {
         if(result.recordsets[0].length>0)   
         {  

            let seed:string="esteEsElSeed";
            let caducidad:string="10m";
          
            //para generar el token
            let xToken = "http://localhost:4200/new-password/codigo:"+jwt.sign({mail:req.body.email },seed,{expiresIn: caducidad})
      

            console.log(xToken);

            const update = " UPDATE inventario.dbo.Usuario SET [reset]    = '"+xToken+"' " + 
                                                      "  WHERE [correo]   = '"+req.body.email+"'"       
            const pepe = await conexion_mssql.request().query(update, (err:any, result:any) => {
      
            console.log(update);

            return res.json({estado:"success",
                             mensaje: "CUENTA reseteada (revisa tu correo)",
                             token: xToken})
                           });
         }
         else
         {
            return res.json({estado:"success",
            mensaje: "CORREO NO ENCONTRADO"});
         }})
      }
   catch(error){      
      console.log('no funco');
      res.json({estado:"error", data:error});
     }
   }

   
//FUNCIONA routerUsuario.route('/new-password').post(newPassword);
//PASAR  email

export async function newPassword(req: Request, res: Response)  {    
   let mail = req.body.newMailDesencriptado;
   try{  
      //primero veo si existe el correo 
      const consulta = "select * from inventario.dbo.Usuario WHERE correo = '"+mail+"'"    

      await conexion_mssql.request().query(consulta, async (err:any, result:any) => {
        if(result.recordsets[0].length>0)
        {
            //Si encuentra lo modifica
              let psw = bcrypt.hashSync(req.body.newPassword, 10) 
              const update = " UPDATE inventario.dbo.Usuario SET [password] = '"+psw +"', "+
                                                               " [reset]    = '' " + 
                                                               " WHERE correo = '"+mail+"'"   
              console.log(update);
              const pepe = await conexion_mssql.request().query(update, (err:any, result:any) => {
        
              return res.json({estado:"success",
                                mensaje: "NUEVO PASSWORD"});
                             })
        }
        else{
           return res.json({estado:"success",
           mensaje: "NO SE ENCONTRO EL CORREO"});
        }})
     }
  catch(error){      
     console.log('no funco');
     res.json({estado:"error", data:error});
    }
  }

