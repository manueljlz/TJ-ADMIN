import { Router } from 'express';
import { usuariosController } from '../controllers/usuariosController';
class MailerRouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        
        this.router.post('/:id', usuariosController.mailer)
        this.router.post('/', usuariosController.accessTjAdmin)
        this.router.put('/:id', usuariosController.updateKeyAccess)
        
        
    }
}

/* Estoy llenando ese router */
const usuariosRouter =  new MailerRouter();
export default usuariosRouter.router;