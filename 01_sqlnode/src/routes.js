import { Router } from 'express';

import UserController from './app/controllers/UserController';
import TechController from './app/controllers/TechController';
import ReportController from './app/controllers/ReportController';
import AddressController from './app/controllers/AddressController';

const routes = Router();

/**
 * Users
 */
routes.get('/users', UserController.index);

routes.post('/users', UserController.store);

/**
 * Address
 */
routes.get('/users/:user_id/addresses', AddressController.index);

routes.post('/users/:user_id/addresses', AddressController.store);

/**
 * Techs
 */
routes.get('/users/:user_id/techs', TechController.index);

routes.post('/users/:user_id/techs', TechController.store);

routes.delete('/users/:user_id/techs', TechController.delete);

/**
 * Report
 */
routes.get('/report', ReportController.show);

export default routes;
