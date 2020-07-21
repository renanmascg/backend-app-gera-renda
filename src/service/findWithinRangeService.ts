import ServiceSchema from '../models/service_schema';
import { ServiceInterface } from '../models/interfaces/service_interface';
import calculateDistanceBetweenCoordinates from './generic_functions/calculate_distance_between_coordinates';
import areServicesOpen from './generic_functions/is_open_now';
import getCategoriesInfo from './generic_functions/get_categories_info';

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
						coordinates: [long, lat],
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

		await areServicesOpen(services);

		await getCategoriesInfo(services);

		this._removeUnnecessaryInfo(services);

		return services;
	}

	private _removeUnnecessaryInfo(list: ServiceInterface[]): void {
		list.forEach(serv => {
			delete serv.openingHour;
			delete serv.services;
			delete serv.formasPagamento;
			delete serv.email;
			delete serv.categoria;
		});
	}
}

export default FindWithinRangeService;
