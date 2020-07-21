import { Schema } from 'mongoose';

const ServicosPrestadosSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String, required: true },
		value: { type: Number, required: true },
	},
	{
		timestamps: true,
	},
);

export default ServicosPrestadosSchema;
