import { ServiceInterface } from '../../models/interfaces/service_interface';
import CategoriesSchema from '../../models/categories_schema';

async function getCategoriesInfo(list: ServiceInterface[]): Promise<void> {
	for (let i = 0; i < list.length; i++) {
		const categorieInfo = await CategoriesSchema.findOne({
			_id: list[i].categoria,
		});

		list[i].categorieUrl = categorieInfo?.get('imageUrl');
	}
}

export default getCategoriesInfo;
