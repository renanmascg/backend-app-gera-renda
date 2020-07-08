import mongoose, { Schema } from 'mongoose';

const CategoriesSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		imageUrl: { type: String, required: true },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('aki-categories', CategoriesSchema);
