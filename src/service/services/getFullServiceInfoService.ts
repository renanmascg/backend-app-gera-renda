import ServiceSchema from '../../models/service_schema';
import { ServiceInterface } from '../../models/interfaces/service_interface';
import calculateDistanceBetweenCoordinates from '../generic_functions/calculate_distance_between_coordinates';
import areServicesOpen from '../generic_functions/is_open_now';
import getCategoriesInfo from '../generic_functions/get_categories_info';
import getFormasPagamento from '../generic_functions/get_formas_pagamento';

interface RequestDTO {
	id: string;
	lat: number;
	long: number;
}

class GetFullServiceInfoService {
	public async exec({ id, lat, long }: RequestDTO): Promise<ServiceInterface> {
		const docService = await ServiceSchema.findOne({ _id: id });

		if (!docService) {
			throw Error('Service not found');
		}

		const service = calculateDistanceBetweenCoordinates({
			list: [docService],
			latPosition: lat,
			longPosition: long,
		});

		await areServicesOpen(service);

		await getCategoriesInfo(service);

		await getFormasPagamento(service);

		this._removeUnnecessaryInfo(service);

		return service[0];
	}

	private _removeUnnecessaryInfo(list: ServiceInterface[]): void {
		list.forEach(serv => {
			delete serv.openingHour;
			delete serv.email;
			delete serv.categoria;
		});
	}
}

export default GetFullServiceInfoService;
