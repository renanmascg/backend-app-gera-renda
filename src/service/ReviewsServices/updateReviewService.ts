import { Document } from 'mongoose';

import TakenServiceSchema from '../../models/taken_services_models/taken_services_schema';

interface RequestDTO {
	takenServiceId: string;
	rate: number;
	text?: string;
}

class UpdateReviewService {
	public async exec({
		takenServiceId,
		rate,
		text,
	}: RequestDTO): Promise<Document> {
		console.log(takenServiceId, rate, text);

		if (!takenServiceId || !rate) {
			throw Error('Send All Variables');
		}

		const takenService = await TakenServiceSchema.findOne({
			_id: takenServiceId,
		});

		if (!takenService) {
			throw Error('Taken Service not found.');
		}

		if (takenService.get('isRated')) {
			throw Error('User already rated this job.');
		}

		const review = await TakenServiceSchema.findOneAndUpdate(
			{
				_id: takenServiceId,
			},
			{
				rate,
				text: text || '',
				isRated: true,
			},
			{
				new: true,
			},
		);

		if (!review) {
			throw Error('Error saving at database.');
		}

		return review;
	}
}

export default UpdateReviewService;
