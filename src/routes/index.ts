import { Router } from 'express';

import categoriesRouter from './inner_routes/categories.routes';

const routes = Router();

routes.use('/categories', categoriesRouter);

export default routes;
