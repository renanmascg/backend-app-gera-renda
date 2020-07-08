import { Router } from 'express';

import CreateNewUserServerService from '../../service/createNewUserServerService';

const servicesRouter = Router();

servicesRouter.post('/', async (req, res) => {
	try {
		const { daysOpening } = req.body;

		const createNewUserServer = new CreateNewUserServerService();

		await createNewUserServer.exec({ daysOpening });

		return res.json({ message: 'ok' });
	} catch (error) {
		return res.status(400).json({ err: error.message });
	}
});

export default servicesRouter;
