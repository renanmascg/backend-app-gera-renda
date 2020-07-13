import ServiceSchema from '../models/service_schema';
import { ServiceInterface } from '../models/interfaces/service_interface';
import calculateDistanceBetweenCoordinates from './generic_functions/calculate_distance_between_coordinates';

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

		const services = calculateDistanceBetweenCoordinates({
			list: documents,
			latPosition: lat,
			longPosition: long,
		});
		return services;
	}
}

export default FindWithinRangeService;
