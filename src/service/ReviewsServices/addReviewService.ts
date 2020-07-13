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

		const review = TakenServiceSchema.create({
			serviceId,
			userId,
		});

		return review;
	}
}

export default AddReviewService;
