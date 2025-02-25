import { Document } from 'mongoose';

import ServiceSchema from '../models/service_schema';
import { ServiceInterface } from '../models/interfaces/service_interface';
import calculateDistanceBetweenCoordinates from './generic_functions/calculate_distance_between_coordinates';
import areServicesOpen from './generic_functions/is_open_now';
import getCategoriesInfo from './generic_functions/get_categories_info';

interface RequestDTO {
	lat: number;
	long: number;
	distance: number;
	categorieId: string;
	sortMethod?: string;
}

class FindServiceByCategorieService {
	public async exec({
		lat,
		long,
		distance,
		categorieId,
		sortMethod,
	}: RequestDTO): Promise<ServiceInterface[]> {
		const documents = await this.findDocumentsWithinRangeAndCategorie(
			lat,
			long,
			distance,
			categorieId,
			sortMethod,
		);

		const services = calculateDistanceBetweenCoordinates({
			list: documents,
			latPosition: lat,
			longPosition: long,
		});

		await areServicesOpen(services);

		await getCategoriesInfo(services);

		this._removeUnnecessaryInfo(services);

		return services;
	}

	private async findDocumentsWithinRangeAndCategorie(
		lat: number,
		long: number,
		distance: number,
		categorieId: string,
		sortMethod?: string,
	): Promise<Document[]> {
		const sort: {
			[key: string]: any;
		} = {};

		if (sortMethod === 'RANKING') {
			sort.reviewScore = 'desc';
		}

		const documents = await ServiceSchema.find({
			location: {
				$near: {
					$geometry: {
						type: 'Point',
						coordinates: [long, lat],
					},
					$maxDistance: distance,
					$minDistance: 0,
				},
			},
			categoria: categorieId,
		}).sort(sort);

		return documents;
	}

	private _removeUnnecessaryInfo(list: ServiceInterface[]): void {
		list.forEach(serv => {
			delete serv.openingHour;
			delete serv.services;
			delete serv.formasPagamento;
			delete serv.email;
			delete serv.categoria;
			delete serv.horarioFuncionamento;
			delete serv.location;
		});
	}
}

export default FindServiceByCategorieService;
