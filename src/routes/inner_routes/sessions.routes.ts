import { Router } from 'express';

const sessionsRouter = Router();

sessionsRouter.get('/', (req, res) => {
	return res.json({ ola: 'bom dia' });
});

export default sessionsRouter;
