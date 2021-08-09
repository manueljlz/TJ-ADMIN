import {Request, Response} from 'express';
import pool from '../database' //me traigo un objeto no un metodo {}
import {transporter} from '../mailer'
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey123456';
//defino las rutas

//ENDPOINTS PRINCIPALS
class UsuariosController
{   
    public async list (req: Request, res: Response)
    {
        const table = req.originalUrl.replace("/", "")
        const data = await pool.query('SELECT * FROM ' + table);
        res.json(data)
    }

    public async listOne (req: Request, res: Response): Promise<any>
    {
        const { id } = req.params; //Destructuring
        const tableFormat = req.originalUrl.replace(req.url, "");
        const table = tableFormat.replace("/", "")
        const data = await pool.query('SELECT * FROM ' + table + ' WHERE ID = ?', [id])

        if ( data.length > 0 ) 
        {
            return res.json(data);
        }
        res.status( 404 ).json( data );
    }

    public async create (req: Request, res: Response): Promise<void> //promesa
    {
        
        try {
            const table = req.originalUrl.replace("/", "")
            const data = await  pool.query('INSERT INTO ' + table + ' SET ?', [req.body])
            res.json(req.body)
        } catch (err) {
           if (err.code === 'ER_DUP_ENTRY') {
            res.status( 404 ).json( { text: ' Datos duplicados ' } );
           } else {
            res.status( 404 ).json( { text: ' Datos no procesados correctamente ' } );
            }
        }
    }

    public async update (req: Request, res: Response): Promise<void>
    {
        console.log("TESTING")
        const { id } = req.params;
        const tableFormat = req.originalUrl.replace(req.url, "");
        const table = tableFormat.replace("/", "")
        const data = await pool.query('UPDATE ' +table+  ' SET  ? WHERE ID = ?', [req.body, id])
        res.json(req.body)
    }

    public async delete (req: Request, res: Response): Promise<void>
    {
        const { id } = req.params;
        const tableFormat = req.originalUrl.replace(req.url, "");
        const table = tableFormat.replace("/", "")
        console.log(req)
        await pool.query('DELETE FROM ' + table +  ' WHERE ID = ? ', [id])
        res.json({message: 'El usuario fue eliminado con exito'});
    }

    public async accessTjAdmin(req: Request, res: Response): Promise<any>
    {
        const email = req.body[0]["email"] //Destructuring in js (obtenr solo una parte del objeto)
        const key = req.body[0]["keyAccess"]
        const data = await pool.query('SELECT * FROM users WHERE email = ? AND keyAdmin = ?', [email, key])

        if ( data.length > 0 ) 
        {
            
            let steamId = data[0]['id'];
            let name    = data[0]['name'];
            console.log(steamId)
            const accessToken  = jwt.sign({email}, SECRET_KEY, {expiresIn: 60 * 60, algorithm: "HS256"})
            const dataUser = {
                id: steamId,
                name: name,
                email: email,
                accessToken: accessToken,
            }
            return res.json({dataUser});
        }else {
            res.status( 404 ).json( { text: ' Datos no encontrado ' } );
        }
    }

    public async updateKeyAccess (req: Request, res: Response): Promise<void>
    {
        const email= req.params;
        let clave = req.body[0];
        const data = await pool.query('UPDATE users SET ? WHERE email = ?', [clave, email])
        res.json(data);
    }

    public async mailer (req: Request, res: Response): Promise<void>
    {
        let to = req.body[0]["to"]
        let asunto
        let regex = /[!A|!a]sunto[aA-zZ]?/g
        if (regex.test(req.body[0]["asunto"]) && /(.+)@(.+){2,}\.(.+){2,}/.test(to)) 
        {
            asunto = req.body[0]["asunto"].substring(8)

            const data = await transporter.sendMail({
                from: '"MANCOS.ES" <manueljl098@gmail.com>', // sender address
                to: to,
                subject: "Administración JymLo App.SA", // Subject line
                text: asunto, // plain text body
            });
            if (data != null) {
                res.json(data)
            }else {
                res.status( 404 ).json( { text: ' Datos no procesados correctamente ' } ); 
            }
           

        }
        else if(/(.+)@(.+){2,}\.(.+){2,}/.test(to)){
            asunto = req.body[0]["asunto"]
            const data = await transporter.sendMail({
                from: '"MANCOS.ES" <manueljl098@gmail.com>', // sender address
                to: to,
                subject: "Administración JymLo App.SA", // Subject line
                text: asunto, // plain text body
            });
            if (data != null) {
                res.json(data)
            }else {
                res.status( 404 ).json( { text: ' Datos no procesados correctamente ' } ); 
            }
        }else {
            res.status( 404 ).json( { text: ' Datos no procesados correctamente ' } );
        }
        
    }
    

    
}

export const usuariosController =  new UsuariosController();