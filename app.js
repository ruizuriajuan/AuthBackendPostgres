require('dotenv').config(); 

const { dbConection } = require('./database/config');
const Server = require('./public/server');

//dbConection();




const server = new Server();
server.listen();

 

 
