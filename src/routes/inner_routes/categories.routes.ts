import { Router } from 'express';
import multer from 'multer';

import CategoriesSchema from '../../models/categories_schema';
import CreateCategorieService from '../../service/createCategorieService';

const categoriesRouter = Router();
const upload = multer();

categoriesRouter.get('/', async (req, res) => {
	try {
		const categoriesList = CategoriesSchema.find({});

		return res.json(categoriesList);
	} catch (error) {
		return res.status(400).json({ err: error.message });
	}
});

categoriesRouter.post(
	'/',
	upload.single('categorieImage'),
	async (req, res) => {
		try {
			const {
				file,
				body: { categorie },
			} = req;

			const createCategorie = new CreateCategorieService();
			await createCategorie.exec({ name: categorie, image: file });

			return res.json({ message: 'ok' });
		} catch (error) {
			return res.status(400).json({ err: error.message });
		}
	},
);

export default categoriesRouter;
