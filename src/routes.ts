import express from 'express';

import DuvidasController from './controllers/DuvidasController';
import UsersControlller from './controllers/UsersController';

const routes = express.Router();

const DuvidasControllers = new DuvidasController();
const UsersControlllers = new UsersControlller();


routes.get('/duvidas', DuvidasControllers.index);
routes.get('/duvidas/search', DuvidasControllers.search);
routes.get('/duvidas/user', DuvidasControllers.userDuvidas);
routes.post('/duvidas', DuvidasControllers.create);
routes.put('/duvidas', DuvidasControllers.update);
routes.delete('/duvidas', DuvidasControllers.delete);

routes.get('/user', UsersControlllers.index);
routes.post('/user', UsersControlllers.create);
routes.put('/user', UsersControlllers.update);



//put editar 
//get buscar
//post inserir
//delete deletar

export default routes;