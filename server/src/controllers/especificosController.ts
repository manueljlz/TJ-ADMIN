import {Request, Response} from 'express';
import pool from '../database' //me traigo un objeto no un metodo {}
//defino las rutas

//ENDPOINTS PRINCIPALS
class EspecificosController
{
    

    public async listOne (req: Request, res: Response): Promise<any>
    {
        const { id } = req.params;
        const tableFormat = req.originalUrl.replace(req.url, "");
        const campoID = req.url
        const table = tableFormat.replace("/", "")
        const data = await pool.query('SELECT * FROM ' + table + ' WHERE identified = ?', [id])

        if ( data.length > 0 ) 
        {
            return res.json(data);
        }

        res.status( 404 ).json( { text: ' Datos no encontrado ' } ); //Alertas de plantilla?
        
    }

    public async listAdminSteamID (req: Request, res: Response): Promise<any>
    {
        
        const data = await pool.query('SELECT * FROM users where `group` = "ADM" ')

        if ( data.length > 0 ) 
        {
            return res.json(data);
        }

        res.status( 404 ).json( data );
        
    }

    public async delete (req: Request, res: Response): Promise<void>
    {
        const { id } = req.params;
        const tableFormat = req.originalUrl.replace(req.url, "");
        const table = tableFormat.replace("/", "")
        console.log(req)
        await pool.query('DELETE FROM ' + table +  ' WHERE identified = ? ', [id])
        res.json({message: 'El resultado fue eliminado con exito'});
    }
}

export const especificosController =  new EspecificosController();