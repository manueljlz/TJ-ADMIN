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
exports.usuariosController = void 0;
const database_1 = __importDefault(require("../database")); //me traigo un objeto no un metodo {}
const mailer_1 = require("../mailer");
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey123456';
//defino las rutas
//ENDPOINTS PRINCIPALS
class UsuariosController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const table = req.originalUrl.replace("/", "");
            const data = yield database_1.default.query('SELECT * FROM ' + table);
            res.json(data);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params; //Destructuring
            const tableFormat = req.originalUrl.replace(req.url, "");
            const table = tableFormat.replace("/", "");
            const data = yield database_1.default.query('SELECT * FROM ' + table + ' WHERE ID = ?', [id]);
            if (data.length > 0) {
                return res.json(data);
            }
            res.status(404).json(data);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const table = req.originalUrl.replace("/", "");
                const data = yield database_1.default.query('INSERT INTO ' + table + ' SET ?', [req.body]);
                res.json(req.body);
            }
            catch (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    res.status(404).json({ text: ' Datos duplicados ' });
                }
                else {
                    res.status(404).json({ text: ' Datos no procesados correctamente ' });
                }
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("TESTING");
            const { id } = req.params;
            const tableFormat = req.originalUrl.replace(req.url, "");
            const table = tableFormat.replace("/", "");
            const data = yield database_1.default.query('UPDATE ' + table + ' SET  ? WHERE ID = ?', [req.body, id]);
            res.json(req.body);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const tableFormat = req.originalUrl.replace(req.url, "");
            const table = tableFormat.replace("/", "");
            console.log(req);
            yield database_1.default.query('DELETE FROM ' + table + ' WHERE ID = ? ', [id]);
            res.json({ message: 'El usuario fue eliminado con exito' });
        });
    }
    accessTjAdmin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body[0]["email"]; //Destructuring in js (obtenr solo una parte del objeto)
            const key = req.body[0]["keyAccess"];
            const data = yield database_1.default.query('SELECT * FROM users WHERE email = ? AND keyAdmin = ?', [email, key]);
            if (data.length > 0) {
                let steamId = data[0]['id'];
                let name = data[0]['name'];
                console.log(steamId);
                const accessToken = jwt.sign({ email }, SECRET_KEY, { expiresIn: 60 * 60, algorithm: "HS256" });
                const dataUser = {
                    id: steamId,
                    name: name,
                    email: email,
                    accessToken: accessToken,
                };
                return res.json({ dataUser });
            }
            else {
                res.status(404).json({ text: ' Datos no encontrado ' });
            }
        });
    }
    updateKeyAccess(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.params;
            let clave = req.body[0];
            const data = yield database_1.default.query('UPDATE users SET ? WHERE email = ?', [clave, email]);
            res.json(data);
        });
    }
    mailer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let to = req.body[0]["to"];
            let asunto;
            let regex = /[!A|!a]sunto[aA-zZ]?/g;
            if (regex.test(req.body[0]["asunto"]) && /(.+)@(.+){2,}\.(.+){2,}/.test(to)) {
                asunto = req.body[0]["asunto"].substring(8);
                const data = yield mailer_1.transporter.sendMail({
                    from: '"MANCOS.ES" <manueljl098@gmail.com>',
                    to: to,
                    subject: "Administración JymLo App.SA",
                    text: asunto, // plain text body
                });
                if (data != null) {
                    res.json(data);
                }
                else {
                    res.status(404).json({ text: ' Datos no procesados correctamente ' });
                }
            }
            else if (/(.+)@(.+){2,}\.(.+){2,}/.test(to)) {
                asunto = req.body[0]["asunto"];
                const data = yield mailer_1.transporter.sendMail({
                    from: '"MANCOS.ES" <manueljl098@gmail.com>',
                    to: to,
                    subject: "Administración JymLo App.SA",
                    text: asunto, // plain text body
                });
                if (data != null) {
                    res.json(data);
                }
                else {
                    res.status(404).json({ text: ' Datos no procesados correctamente ' });
                }
            }
            else {
                res.status(404).json({ text: ' Datos no procesados correctamente ' });
            }
        });
    }
}
exports.usuariosController = new UsuariosController();
