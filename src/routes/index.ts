import { Router } from 'express';

import categoriesRouter from './inner_routes/categories.routes';
import serviceRouter from './inner_routes/service.routes';

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/services', serviceRouter);

export default routes;
