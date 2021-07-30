import {Token} from '../class/token';
import { NextFunction, Response } from 'express';

export const verificarToken = (req:any, res:Response, next:NextFunction)=>{
    //si viene undefind o null, va a colocar en blanco ""
    const userToken = req.get('x-token') || "";

    Token.checkToken(userToken).then(decoded=>{
        
        req.usuario = decoded.usuario
        console.log("este de mi decoded.usuario")
        console.log(decoded.usuario)
        const refreshToken = Token.getToken(
            req.usuario
        )
        console.log('EN AUTHENTICATIONS.TS'+refreshToken)
        req.token = refreshToken
        next()
    })
    .catch(error=>{
        res.json({
            estado:"success",
            mensaje:"Token incorrecto",
            error: error
        })
    })
}




