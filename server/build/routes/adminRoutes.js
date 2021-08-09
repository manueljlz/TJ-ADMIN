"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const especificosController_1 = require("../controllers/especificosController");
class AdminRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        /* Ruta inicial */
        console.log("ROUTE");
        this.router.get('/', especificosController_1.especificosController.listAdminSteamID);
    }
}
/* Estoy llenando ese router */
const adminRouter = new AdminRouter();
exports.default = adminRouter.router;
