import express from 'express';

import DuvidasController from './controllers/DuvidasController';
import UsersControlller from './controllers/UsersController';
import CandidatarController from './controllers/CandidatarControllers';

const routes = express.Router();

const DuvidasControllers = new DuvidasController();
const UsersControlllers = new UsersControlller();
const CandidatarControllers = new CandidatarController();


routes.get('/duvidas', DuvidasControllers.index);
routes.get('/duvidas/search', DuvidasControllers.search);
routes.get('/duvidas/user/:email', DuvidasControllers.userDuvidas);
routes.post('/duvidas', DuvidasControllers.create);
routes.put('/duvidas', DuvidasControllers.update);
routes.delete('/duvidas/:id', DuvidasControllers.delete);

routes.get('/user/:email', UsersControlllers.index);
routes.post('/user', UsersControlllers.create);
routes.put('/user', UsersControlllers.update);
routes.put('/user/candidato', UsersControlllers.like);

routes.get('/candidatar/:duvida_id', CandidatarControllers.index);
routes.post('/candidatar', CandidatarControllers.create);
routes.delete('/candidatar', CandidatarControllers.delete);


//put editar 
//get buscar
//post inserir
//delete deletar

export default routes;

//const user = await api.post(`/user?format=${dar}`)  recebe.query
//const user = await api.post(`/user`, dataUser) body recebe variavel com objeto
//const user = await api.post(`/user/id`, dataUser) .params 'e depois de barra