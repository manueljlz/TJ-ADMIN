"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexController = void 0;
const database_1 = __importDefault(require("../database")); //me traigo un objeto no un metodo {}
//defino las rutas
//ENDPOINTS PRINCIPALS
class IndexController {
    index(req, res) {
        database_1.default.query('DESCRIBE shops');
        res.json('shops');
        res.json({ text: 'API Is api/home' });
    }
}
exports.indexController = new IndexController();
