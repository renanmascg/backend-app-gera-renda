import { Router } from 'express';

import categoriesRouter from './inner_routes/categories.routes';
import serviceRouter from './inner_routes/service.routes';
import reviewsRouter from './inner_routes/reviews.routes';
import usersRouter from './inner_routes/users.routes';
import sessionsRouter from './inner_routes/sessions.routes';
import passwordRouter from './inner_routes/password.routes';

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/services', serviceRouter);
routes.use('/reviews', reviewsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
