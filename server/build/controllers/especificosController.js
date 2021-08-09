"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.especificosController = void 0;
const database_1 = __importDefault(require("../database")); //me traigo un objeto no un metodo {}
//defino las rutas
//ENDPOINTS PRINCIPALS
class EspecificosController {
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tableFormat = req.originalUrl.replace(req.url, "");
            const campoID = req.url;
            const table = tableFormat.replace("/", "");
            const data = yield database_1.default.query('SELECT * FROM ' + table + ' WHERE identified = ?', [id]);
            if (data.length > 0) {
                return res.json(data);
            }
            res.status(404).json({ text: ' Datos no encontrado ' }); //Alertas de plantilla?
        });
    }
    listAdminSteamID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield database_1.default.query('SELECT * FROM users where `group` = "ADM" ');
            if (data.length > 0) {
                return res.json(data);
            }
            res.status(404).json(data);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tableFormat = req.originalUrl.replace(req.url, "");
            const table = tableFormat.replace("/", "");
            console.log(req);
            yield database_1.default.query('DELETE FROM ' + table + ' WHERE identified = ? ', [id]);
            res.json({ message: 'El resultado fue eliminado con exito' });
        });
    }
}
exports.especificosController = new EspecificosController();
