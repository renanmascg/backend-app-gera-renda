import { Document } from 'mongoose';

import ServiceSchema from '../models/service_schema';
import { ServiceInterface } from '../models/interfaces/service_interface';
import calculateDistanceBetweenCoordinates from './generic_functions/calculate_distance_between_coordinates';

interface RequestDTO {
	lat: number;
	long: number;
	distance: number;
	categorieId: string;
}

class FindServiceByCategorieService {
	public async exec({
		lat,
		long,
		distance,
		categorieId,
	}: RequestDTO): Promise<ServiceInterface[]> {
		const documents = await this.findDocumentsWithinRangeAndCategorie(
			lat,
			long,
			distance,
			categorieId,
		);

		const services = calculateDistanceBetweenCoordinates({
			list: documents,
			latPosition: lat,
			longPosition: long,
		});

		return services;
	}

	private async findDocumentsWithinRangeAndCategorie(
		lat: number,
		long: number,
		distance: number,
		categorieId: string,
	): Promise<Document[]> {
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
		});

		return documents;
	}
}

export default FindServiceByCategorieService;
