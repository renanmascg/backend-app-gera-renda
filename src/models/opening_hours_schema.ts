import mongoose, { Schema } from 'mongoose';
import { bool } from 'aws-sdk/clients/signer';

export interface IDayOpening {
	isOpen: bool;
	start?: number;
	end?: number;
}

const OpeningHoursSchema: Schema = new Schema(
	{
		dom: {
			isOpen: { type: Boolean, default: false },
			start: { type: Number, min: 0, max: 23 },
			end: { type: Number, min: 0, max: 23 },
		},
		seg: {
			isOpen: { type: Boolean, default: false },
			start: { type: Number, min: 0, max: 23 },
			end: { type: Number, min: 0, max: 23 },
		},
		ter: {
			isOpen: { type: Boolean, default: false },
			start: { type: Number, min: 0, max: 23 },
			end: { type: Number, min: 0, max: 23 },
		},
		qua: {
			isOpen: { type: Boolean, default: false },
			start: { type: Number, min: 0, max: 23 },
			end: { type: Number, min: 0, max: 23 },
		},
		qui: {
			isOpen: { type: Boolean, default: false },
			start: { type: Number, min: 0, max: 23 },
			end: { type: Number, min: 0, max: 23 },
		},
		sex: {
			isOpen: { type: Boolean, default: false },
			start: { type: Number, min: 0, max: 23 },
			end: { type: Number, min: 0, max: 23 },
		},
		sab: {
			isOpen: { type: Boolean, default: false },
			start: { type: Number, min: 0, max: 23 },
			end: { type: Number, min: 0, max: 23 },
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('aki-openinghours', OpeningHoursSchema);
