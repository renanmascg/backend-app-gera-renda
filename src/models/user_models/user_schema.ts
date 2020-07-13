import mongoose, { Schema } from 'mongoose';

const UserSchema: Schema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: { type: String, required: true },
		name: { type: String, required: true },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('aki-users', UserSchema);
