import jwt from 'jsonwebtoken';
 
class Token {
    //esta es la semilla suele ser la hora, no se debe  compartir con nadie
    private static seed:string="esteEsElSeed";
    //es el tiempo que va a estar vigente el token
    private static caducidad:string="30d";
 
    constructor(){}
 
    //para generar el token
    static getToken(payload:{}):string{
        const token = jwt.sign(
            {
                usuario:payload     
            },
            this.seed,
        {expiresIn: this.caducidad}
        )
            return token;
    }
 
    //validar el token
    static checkToken(token:string):Promise<any>{
        return new Promise((resolve, reject)=>{
            jwt.verify(token, this.seed,(error,decode)=>{
                if(error){
                    return reject(error)
                }
                else{
console.log(decode+'//////////////////////////////////////////////////////////////////////////////')
                    return resolve(decode)
                }
            })
        })
}}
export {Token};
 
