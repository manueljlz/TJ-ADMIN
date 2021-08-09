import express, {Application} from 'express';

import indexRoutes from './routes/indexRoutes';
import dataRouter from './routes/usuariosRoutes';
import mailerRouter from './routes/mailerRoutes';
import adminRoutes from './routes/adminRoutes';

import morgan from 'morgan';
import cors from 'cors';


class Server {

    /* Save property express */

    public app: Application;

    constructor() {
        this.app = express(); 
        this.config();
        this.routes();
    }

    config(): void  {
        this.app.set('port', process.env.PORT ||  3000);
        this.app.use(morgan('dev'));
        this.app.use(cors()); /* Angular empieza a pedir datos al server */
        this.app.use(express.json()); /* Podrá aceptar formatos json de clientes */
        this.app.use(express.urlencoded({extended: false})); /* El caso de que queramos enviar desde form html */
    }
    routes(): void {
        this.app.use('/home', indexRoutes);
        this.app.use('/users', dataRouter);
        this.app.use('/addon_account', dataRouter);
        this.app.use('/billing', dataRouter);
        this.app.use('/characters', dataRouter);
        this.app.use('/fine_types', dataRouter);
        this.app.use('/impounded_vehicles', dataRouter);
        this.app.use('/items', dataRouter);
        this.app.use('/jails', dataRouter)
        this.app.use('/jobs', dataRouter)
        this.app.use('/owned_properties', dataRouter)
        this.app.use('/billing/identifier', dataRouter)
        this.app.use('/owned_vehicles', dataRouter)
        this.app.use('/owned_vehicles/identifier', dataRouter)
        this.app.use('/jails/identifier', dataRouter)
        this.app.use('/mailer', mailerRouter)
        this.app.use('/accessTjAdmin', mailerRouter)
        this.app.use('/updateAdminKey', mailerRouter)
        this.app.use('/listAdmin', adminRoutes)
    }
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server ON to", this.app.get('port'))
        }); 
    }
}

const server = new Server();
server.start();