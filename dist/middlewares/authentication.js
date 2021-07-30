"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificarToken = void 0;
const token_1 = require("../class/token");
const verificarToken = (req, res, next) => {
    //si viene undefind o null, va a colocar en blanco ""
    const userToken = req.get('x-token') || "";
    token_1.Token.checkToken(userToken).then(decoded => {
        req.usuario = decoded.usuario;
        console.log("este de mi decoded.usuario");
        console.log(decoded.usuario);
        const refreshToken = token_1.Token.getToken(req.usuario);
        console.log('EN AUTHENTICATIONS.TS' + refreshToken);
        req.token = refreshToken;
        next();
    })
        .catch(error => {
        res.json({
            estado: "success",
            mensaje: "Token incorrecto",
            error: error
        });
    });
};
exports.verificarToken = verificarToken;
