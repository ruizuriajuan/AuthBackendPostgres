

const express = require('express');
const cors = require('cors');
const db = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/auth';
        //Cx base de datos
        this.conectarBD();
        //middlewares
        this.middlewares();
        //rutas de la aplicacion
        this.routes();
    }

    async conectarBD(){
        await db.dbConection();
    }

    middlewares() {
        //directorio publico
        this.app.use(express.static('public'));
        //Lectura y parseo del body
        this.app.use( express.json() );
        this.app.use(cors());
    }

    routes() {
        //middleware condicional
        this.app.use(this.usuariosPath,require('../routes/user.routes'));
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando en el puerto : ', this.port);
        })
    }

}

module.exports = Server;