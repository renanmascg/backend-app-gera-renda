import { Document } from 'mongoose';

import ServiceSchema from '../models/service_schema';
import CategoriesSchema from '../models/categories_schema';
import { ServiceInterface } from '../models/interfaces/service_interface';
import calculateDistanceBetweenCoordinates from './generic_functions/calculate_distance_between_coordinates';

interface RequestDTO {
	keyword: string;
	lat: number;
	long: number;
}

interface Response {
	services: ServiceInterface[];
	categories: Document[];
}

class FindServiceOrCategorieService {
	public async exec({ keyword, lat, long }: RequestDTO): Promise<Response> {
		const services = await this.findServices(keyword, lat, long);

		const categories = await this.findCategories(keyword);

		return {
			services,
			categories,
		};
	}

	private async findServices(
		keyword: string,
		lat: number,
		long: number,
	): Promise<ServiceInterface[]> {
		try {
			const servicesDocs = await ServiceSchema.find({
				$or: [
					{ name: { $regex: keyword, $options: 'i' } },
					{ descricao: { $regex: keyword, $options: 'i' } },
				],
			});

			const services = calculateDistanceBetweenCoordinates({
				list: servicesDocs,
				latPosition: lat,
				longPosition: long,
			});

			return services;
		} catch (error) {
			throw Error('Error consulting services');
		}
	}

	private async findCategories(keyword: string): Promise<Document[]> {
		try {
			const categoriesDocs = await CategoriesSchema.find({
				name: { $regex: keyword, $options: 'i' },
			});

			return categoriesDocs;
		} catch (error) {
			throw Error('Error consulting categories');
		}
	}
}

export default FindServiceOrCategorieService;
