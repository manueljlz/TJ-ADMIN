import { Router } from 'express';
import { especificosController } from '../controllers/especificosController';
class AdminRouter {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        /* Ruta inicial */
        console.log("ROUTE")
        
        this.router.get('/', especificosController.listAdminSteamID)
        
        
    }
}

/* Estoy llenando ese router */
const adminRouter =  new AdminRouter();
export default adminRouter.router;