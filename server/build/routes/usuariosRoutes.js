"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const especificosController_1 = require("../controllers/especificosController");
const usuariosController_1 = require("../controllers/usuariosController");
class UsuariosRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        /* Ruta inicial */
        console.log("ROUTE");
        this.router.get('/', usuariosController_1.usuariosController.list);
        this.router.get('/:id', usuariosController_1.usuariosController.listOne);
        this.router.get('/identified/:id', especificosController_1.especificosController.listOne);
        this.router.get('/listAdmin', especificosController_1.especificosController.listAdminSteamID);
        this.router.post('/', usuariosController_1.usuariosController.create);
        this.router.put('/:id', usuariosController_1.usuariosController.update);
        this.router.delete('/:id', usuariosController_1.usuariosController.delete);
        this.router.delete('/identified/:id', especificosController_1.especificosController.delete);
    }
}
/* Estoy llenando ese router */
const usuariosRouter = new UsuariosRouter();
exports.default = usuariosRouter.router;
