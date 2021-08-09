import { Router } from 'express';
import { especificosController } from '../controllers/especificosController';
import { usuariosController } from '../controllers/usuariosController';
class UsuariosRouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        /* Ruta inicial */
        console.log("ROUTE")
        
        this.router.get('/', usuariosController.list)
        this.router.get('/:id', usuariosController.listOne)
        this.router.get('/identified/:id', especificosController.listOne)
        this.router.get('/listAdmin', especificosController.listAdminSteamID)
        this.router.post('/', usuariosController.create)
        this.router.put('/:id', usuariosController.update)
        this.router.delete('/:id', usuariosController.delete)
        this.router.delete('/identified/:id', especificosController.delete)
        
        
    }
}

/* Estoy llenando ese router */
const usuariosRouter =  new UsuariosRouter();
export default usuariosRouter.router;