"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class AddonAccountRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        /* Ruta inicial */
        this.router.get('/', usuariosController_1.usuariosController.list);
        this.router.get('/:id', usuariosController_1.usuariosController.listOne);
        this.router.post('/', usuariosController_1.usuariosController.create);
        this.router.put('/:id', usuariosController_1.usuariosController.update);
        this.router.delete('/:id', usuariosController_1.usuariosController.delete);
    }
}
/* Estoy llenando ese router */
const usuariosRouter = new AddonAccountRouter();
exports.default = usuariosRouter.router;
