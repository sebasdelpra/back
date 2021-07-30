import Server from './class/server';
import userRoutes from './routes/usuario';
import userMail from './routes/mail';
import bodyPaser from 'body-parser';
import cors from 'cors';

console.log('Hola mundo');
const server=new Server;
server.start(()=>{
    console.log(`Servidor corriendo en puerto ${server.puerto} y en host ${server.host}`);
});
//body parser simpre antes de la definicion de rutas
server.app.use(bodyPaser.urlencoded({extended:true}));
server.app.use(bodyPaser.json());
//rutas
server.app.use(cors());
server.app.use('/usuario', userRoutes);
server.app.use('/', userMail);





