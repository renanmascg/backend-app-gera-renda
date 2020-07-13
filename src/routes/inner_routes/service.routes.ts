import { Router } from 'express';

import multer from 'multer';
import CreateNewUserServerService from '../../service/createNewUserServerService';
import FindWithinRangeService from '../../service/findWithinRangeService';
import FindServiceByCategorieService from '../../service/findServiceByCategorieService';

const servicesRouter = Router();
const upload = multer();

servicesRouter.post('/', upload.single('logoImage'), async (req, res) => {
	try {
		const { file } = req;

		const {
			name,
			lat,
			long,
			endereco,
			telefone,
			descricao,
			categoria,
			formasPagamento,
			daysOpening,
		} = req.body;

		const createNewUserServer = new CreateNewUserServerService();

		const newService = await createNewUserServer.exec({
			daysOpening,
			name,
			lat,
			long,
			endereco,
			telefone,
			descricao,
			categoria,
			formasPagamento,
		});

		return res.json(newService);
	} catch (error) {
		return res.status(400).json({ err: error.message });
	}
});

servicesRouter.post('/near-me', async (req, res) => {
	try {
		const { lat, long, distance } = req.body;

		const findWithinRange = new FindWithinRangeService();

		const documents = await findWithinRange.findWithinRange({
			lat,
			long,
			distance,
		});

		return res.json(documents);
	} catch (error) {
		return res.status(400).json({ err: error.message });
	}
});

servicesRouter.post('/categorie-service', async (req, res) => {
	try {
		const { lat, long, distance, categorieId } = req.body;

		const findServiceByCategorie = new FindServiceByCategorieService();

		const services = await findServiceByCategorie.exec({
			lat,
			long,
			distance,
			categorieId,
		});

		return res.json(services);
	} catch (error) {
		return res.status(400).json({ err: error.message });
	}
});

export default servicesRouter;
