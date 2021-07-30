"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./class/server"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const mail_1 = __importDefault(require("./routes/mail"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
console.log('Hola mundo');
const server = new server_1.default;
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.puerto} y en host ${server.host}`);
});
//body parser simpre antes de la definicion de rutas
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//rutas
server.app.use(cors_1.default());
server.app.use('/usuario', usuario_1.default);
server.app.use('/', mail_1.default);
