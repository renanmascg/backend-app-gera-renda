import { Document } from 'mongoose';
import TakenServiceSchema from '../../models/taken_services_models/taken_services_schema';

interface RequestDTO {
	serviceId: string;
	userId: string;
}

class AddReviewService {
	public async exec({ serviceId, userId }: RequestDTO): Promise<Document> {
		if (!serviceId || !userId) {
			throw Error('Send all variables please');
		}

		const takenService = await TakenServiceSchema.find({
			serviceId,
			userId,
		});

		if (!takenService) {
			throw Error('This error already exists.');
		}

		const review = await TakenServiceSchema.create({
			serviceId,
			userId,
		});

		return review;
	}
}

export default AddReviewService;
