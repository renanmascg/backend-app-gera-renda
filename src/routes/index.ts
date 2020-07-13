import { Router } from 'express';

import categoriesRouter from './inner_routes/categories.routes';
import serviceRouter from './inner_routes/service.routes';
import reviewsRouter from './inner_routes/reviews.routes';

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/services', serviceRouter);
routes.use('/reviews', reviewsRouter);

export default routes;
