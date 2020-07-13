import mongoose, { Schema } from 'mongoose';

const ReviewSchema: Schema = new Schema(
	{
		serviceId: {
			type: Schema.Types.ObjectId,
			ref: 'aki-service',
			required: true,
		},
		rate: { type: Number, required: true },
		text: { type: String, required: true },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('aki-reviews', ReviewSchema);
