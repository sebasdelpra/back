import { verificarToken } from './../middlewares/authentication';
import { Router, Request, Response } from 'express';
const nodemailer = require("nodemailer");

export async function envioElMail(req:Request, res: Response)  {

  //console.log(req.body);

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

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

  
  let info = await transporter.sendMail({
    from: '"AVISO DE RESETEO DE CLAVE 👻" <sebastiandelprado@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: "Su contraseña fue reseteada ✔", // Subject line
    html: "<b>DEBERA INGRESAR UNA CLAVE NUEVA. "+ req.body.xToken+ "</b>" // html body
  });

  //console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

   return res.json(info);
}



 
 
 