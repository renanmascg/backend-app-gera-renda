import { Router } from 'express';

const servicesRouter = Router();

servicesRouter.get('/', async (req, res) => {
	try {
		return res.json({ message: 'ok' });
	} catch (error) {
		return res.status(400).json({ err: error.message });
	}
});

export default servicesRouter;
