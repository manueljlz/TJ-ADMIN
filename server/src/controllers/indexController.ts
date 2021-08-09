import {Request, Response} from 'express';
import pool from '../database' //me traigo un objeto no un metodo {}
//defino las rutas

//ENDPOINTS PRINCIPALS
class IndexController
{
    public index (req: Request, res: Response)
    {
        pool.query('DESCRIBE shops');
        res.json('shops');
        res.json({text: 'API Is api/home'})
    } 
}

export const indexController =  new IndexController();