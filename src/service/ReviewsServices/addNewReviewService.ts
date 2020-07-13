import { Document } from 'mongoose';

import ReviewSchema from '../../models/taken_services_models/review_schema';

interface RequestDTO {
	serviceId: string;
	rate: number;
	text: string;
}

class AddNewReviewService {
	public async exec({ rate, text, serviceId }: RequestDTO): Promise<Document> {
		try {
			const review = await ReviewSchema.create({
				rate,
				text,
				serviceId,
			});

			return review;
		} catch (error) {
			throw Error('Error creating review service');
		}
	}
}

export default AddNewReviewService;
