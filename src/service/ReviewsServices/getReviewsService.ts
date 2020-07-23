import { Document } from 'mongoose';
import TakenServiceSchema from '../../models/taken_services_models/taken_services_schema';
import TakenServiceInterface from '../../models/interfaces/taken_service_interface';
import UserSchema from '../../models/user_models/user_schema';
import ServiceSchema from '../../models/service_schema';

class GetReviewsService {
	public async fromService(
		serviceId: string,
	): Promise<TakenServiceInterface[]> {
		if (!serviceId) {
			throw Error('ServiceID is needed');
		}

		const takenServiceDocs = await TakenServiceSchema.find({
			serviceId,
			isRated: true,
			isServiceDone: true,
		}).limit(25);

		const reviews = await this.getUserImageInfo(takenServiceDocs);

		return reviews;
	}

	public async fromUser(userId: string): Promise<TakenServiceInterface[]> {
		if (!userId) {
			throw Error('ServiceID is needed');
		}

		const takenServiceDocs = await TakenServiceSchema.find({
			userId,
		}).limit(25);

		const reviews = await this.getServiceInfo(takenServiceDocs);

		return reviews;
	}

	private async getUserImageInfo(
		docs: Document[],
	): Promise<TakenServiceInterface[]> {
		const takenServices: TakenServiceInterface[] = [];

		for (let i = 0; i < docs.length; i++) {
			const obj: TakenServiceInterface = docs[i].toObject();

			const userInfo = await UserSchema.findOne({ _id: obj.serviceId });

			obj.userImageUrl = userInfo?.get('imageUrl');

			takenServices.push(obj);
		}

		return takenServices;
	}

	private async getServiceInfo(
		docs: Document[],
	): Promise<TakenServiceInterface[]> {
		const takenServices: TakenServiceInterface[] = [];

		for (let i = 0; i < docs.length; i++) {
			const obj: TakenServiceInterface = docs[i].toObject();

			const serviceInfo = await ServiceSchema.findOne({ _id: obj.serviceId });

			obj.serviceInfo = serviceInfo?.toObject();

			takenServices.push(obj);
		}

		return takenServices;
	}
}

export default GetReviewsService;
