import { Router } from 'express';
import sessionsRouter from './inner_routes/sessions.routes';

const routes = Router();

routes.use('/sessions', sessionsRouter);

export default routes;
