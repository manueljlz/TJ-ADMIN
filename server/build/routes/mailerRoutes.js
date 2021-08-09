"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class MailerRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post('/:id', usuariosController_1.usuariosController.mailer);
        this.router.post('/', usuariosController_1.usuariosController.accessTjAdmin);
        this.router.put('/:id', usuariosController_1.usuariosController.updateKeyAccess);
    }
}
/* Estoy llenando ese router */
const usuariosRouter = new MailerRouter();
exports.default = usuariosRouter.router;
