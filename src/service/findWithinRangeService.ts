import { Document } from 'mongoose';
import * as geolib from 'geolib';
import ServiceSchema from '../models/service_schema';
import { ServiceInterface } from '../models/interfaces/service_interface';

interface LatLongInterface {
	distance: number;
	lat: number;
	long: number;
}

class FindWithinRangeService {
	public async findWithinRange({
		distance,
		lat,
		long,
	}: LatLongInterface): Promise<ServiceInterface[]> {
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
		});

		const services = this.calculateDistance(documents, lat, long);

		return services;
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

export default FindWithinRangeService;
