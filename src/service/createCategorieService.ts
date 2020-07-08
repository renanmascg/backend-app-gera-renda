import { Document } from 'mongoose';
import CategoriesSchema from '../models/categories_schema';
import S3StorageProvider from '../database/S3StorageProvider';

interface RequestDTO {
	name: string;
	image: Express.Multer.File;
}

class CreateCategorieService {
	public async exec({ name, image }: RequestDTO): Promise<Document> {
		if (!name || !image) {
			throw Error('Variables name and image must be sent');
		}

		const S3Storage = new S3StorageProvider();

		try {
			const imageName = `${name}.png`;

			const imageUrl = await S3Storage.uploadFileToAWS({
				file: image,
				name: `categorias/${imageName}`,
			});

			const categorie = await this._createCategoriesDatabase(name, imageUrl);

			return categorie;
		} catch (e) {
			console.log(e);
			throw Error('Error creating new categorie.');
		}
	}

	private async _createCategoriesDatabase(
		name: string,
		imageUrl: string,
	): Promise<Document> {
		const categorie = await CategoriesSchema.findOneAndUpdate(
			{
				name,
			},
			{
				name,
				imageUrl,
			},
			{
				new: true,
				upsert: true,
			},
		);

		return categorie;
	}
}

export default CreateCategorieService;
