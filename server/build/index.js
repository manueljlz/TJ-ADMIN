"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
const mailerRoutes_1 = __importDefault(require("./routes/mailerRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default()); /* Angular empieza a pedir datos al server */
        this.app.use(express_1.default.json()); /* Podrá aceptar formatos json de clientes */
        this.app.use(express_1.default.urlencoded({ extended: false })); /* El caso de que queramos enviar desde form html */
    }
    routes() {
        this.app.use('/home', indexRoutes_1.default);
        this.app.use('/users', usuariosRoutes_1.default);
        this.app.use('/addon_account', usuariosRoutes_1.default);
        this.app.use('/billing', usuariosRoutes_1.default);
        this.app.use('/characters', usuariosRoutes_1.default);
        this.app.use('/fine_types', usuariosRoutes_1.default);
        this.app.use('/impounded_vehicles', usuariosRoutes_1.default);
        this.app.use('/items', usuariosRoutes_1.default);
        this.app.use('/jails', usuariosRoutes_1.default);
        this.app.use('/jobs', usuariosRoutes_1.default);
        this.app.use('/owned_properties', usuariosRoutes_1.default);
        this.app.use('/billing/identifier', usuariosRoutes_1.default);
        this.app.use('/owned_vehicles', usuariosRoutes_1.default);
        this.app.use('/owned_vehicles/identifier', usuariosRoutes_1.default);
        this.app.use('/jails/identifier', usuariosRoutes_1.default);
        this.app.use('/mailer', mailerRoutes_1.default);
        this.app.use('/accessTjAdmin', mailerRoutes_1.default);
        this.app.use('/updateAdminKey', mailerRoutes_1.default);
        this.app.use('/listAdmin', adminRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log("Server ON to", this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
