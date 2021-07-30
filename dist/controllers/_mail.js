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
Object.defineProperty(exports, "__esModule", { value: true });
exports.envioElMail = void 0;
const nodemailer = require("nodemailer");
function envioElMail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        //console.log(req.body);
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = yield nodemailer.createTestAccount();
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: 'sebastiandelprado@gmail.com',
                pass: 'bepnzbbfmrwaohnp',
            },
        });
        // send mail with defined transport object
        let info = yield transporter.sendMail({
            from: '"AVISO DE RESETEO DE CLAVE 👻" <sebastiandelprado@gmail.com>',
            to: req.body.email,
            subject: "Su contraseña fue reseteada ✔",
            html: "<b>DEBERA INGRESAR UNA CLAVE NUEVA. " + req.body.xToken + "</b>" // html body
        });
        //console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        return res.json(info);
    });
}
exports.envioElMail = envioElMail;
