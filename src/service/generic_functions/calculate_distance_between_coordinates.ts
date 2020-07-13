import * as geolib from 'geolib';
import { Document } from 'mongoose';
import { ServiceInterface } from '../../models/interfaces/service_interface';

interface CalculateDistanceInterface {
	list: Document[];
	latPosition: number;
	longPosition: number;
}

export default function calculateDistanceBetweenCoordinates({
	list,
	latPosition,
	longPosition,
}: CalculateDistanceInterface): ServiceInterface[] {
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
