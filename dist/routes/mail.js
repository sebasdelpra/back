"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const _mail_1 = require("../controllers/_mail");
const routerMail = express_1.Router();
// post   envia el mail
// http://localhost:3000/mail
routerMail.route('/mail').post(_mail_1.envioElMail); //Pasar el email
exports.default = routerMail;
