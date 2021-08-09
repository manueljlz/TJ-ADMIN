import { Router } from 'express';
import {indexController} from '../controllers/indexController';
import { usuariosController } from '../controllers/usuariosController';
class AddonAccountRouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        /* Ruta inicial */
        this.router.get('/', usuariosController.list)
        this.router.get('/:id', usuariosController.listOne)
        this.router.post('/', usuariosController.create)
        this.router.put('/:id', usuariosController.update)
        this.router.delete('/:id', usuariosController.delete)
        
    }
}

/* Estoy llenando ese router */
const usuariosRouter =  new AddonAccountRouter();
export default usuariosRouter.router;