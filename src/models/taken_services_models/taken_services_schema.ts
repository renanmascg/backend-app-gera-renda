import mongoose, { Schema } from 'mongoose';

const TakenServiceSchema: Schema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'aki-service',
			required: true,
		},
		serviceId: {
			type: Schema.Types.ObjectId,
			ref: 'aki-service',
			required: true,
		},
		isRated: { type: Boolean, default: false },
		rate: { type: Number },
		text: { type: String },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('aki-takenservice', TakenServiceSchema);
