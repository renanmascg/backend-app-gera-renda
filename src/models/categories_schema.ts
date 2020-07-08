import mongoose, { Schema } from 'mongoose';

export interface ICategories {
	name: string;
	imageUrl: string;
}

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
