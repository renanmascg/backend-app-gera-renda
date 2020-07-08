import mongoose, { Schema } from 'mongoose';

const OpeningHoursSchema: Schema = new Schema(
	{
		serviceId: { type: Schema.Types.ObjectId, required: true },
		sun: {
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
		wed: {
			isOpen: { type: Boolean, default: false },
			start: { type: Number, min: 0, max: 23 },
			end: { type: Number, min: 0, max: 23 },
		},
		thu: {
			isOpen: { type: Boolean, default: false },
			start: { type: Number, min: 0, max: 23 },
			end: { type: Number, min: 0, max: 23 },
		},
		fri: {
			isOpen: { type: Boolean, default: false },
			start: { type: Number, min: 0, max: 23 },
			end: { type: Number, min: 0, max: 23 },
		},
		sat: {
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
