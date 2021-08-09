import { Router } from 'express';
import {indexController} from '../controllers/indexController';
class IndexRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        /* Ruta inicial */
        this.router.get('/', indexController.index)
        this.router.post('/')
    }
}

/* Estoy llenando ese router */
const indexRoutes =  new IndexRoutes();
export default indexRoutes.router;