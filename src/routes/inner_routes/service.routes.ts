import { Router } from 'express';

import multer from 'multer';
import CreateNewUserServerService from '../../service/createNewUserServerService';

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

export default servicesRouter;
