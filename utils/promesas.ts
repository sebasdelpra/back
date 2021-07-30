import conexion_mssql from '../bin/conexion_mssql';
 
const query = (query:string, variables:Array<any> = []) =>{
    return new Promise((resolve,reject)=>{
        conexion_mssql.query(query,variables,(error:string,result:any)=>{
            if(error){
                console.log({estado:"error",mensaje: "error en conexion a base datos",data: error})
                reject({estado:"error",mensaje: "error en conexion a base datos",data: error});
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
    })
}
 
export default query

