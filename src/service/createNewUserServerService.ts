import { Document } from 'mongoose';

import OpeningHoursSchema from '../models/opening_hours_schema';

interface RequestDTO {
	daysOpening: any;
}

class CreateNewUserServer {
	public async exec({ daysOpening }: RequestDTO): Promise<void> {
		await this._createOpeningHours(daysOpening);
	}

	public async _createOpeningHours(daysOpening: any): Promise<Document> {
		try {
			const openHours = await OpeningHoursSchema.create(daysOpening);

			console.log(openHours);

			return openHours;
		} catch (error) {
			throw Error('Error creating opening hours.');
		}
	}
}

export default CreateNewUserServer;
