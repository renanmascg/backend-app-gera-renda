import { Router } from 'express';
import sessionsRouter from './inner_routes/sessions.routes';
import userRouter from './inner_routes/users.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);
routes.use('/users', userRouter);

export default routes;
