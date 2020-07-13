import { Document } from 'mongoose';
import * as geolib from 'geolib';

import ServiceSchema from '../models/service_schema';
import { ServiceInterface } from '../models/interfaces/service_interface';

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

		const services = this.calculateDistance(documents, lat, long);

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
						coordinates: [lat, long],
					},
					$maxDistance: distance,
					$minDistance: 0,
				},
			},
			categoria: categorieId,
		});

		return documents;
	}

	private calculateDistance(
		list: Document[],
		latPosition: number,
		longPosition: number,
	): ServiceInterface[] {
		const calculatedDistance = list.map(doc => {
			const obj: ServiceInterface = doc.toObject();

			obj.distance = (
				geolib.getDistance(
					{
						latitude: latPosition,
						longitude: longPosition,
					},
					{
						latitude: obj.location.coordinates[0],
						longitude: obj.location.coordinates[1],
					},
				) / 1000
			).toFixed(1);

			delete obj.location;

			return obj;
		});

		return calculatedDistance;
	}
}

export default FindServiceByCategorieService;
