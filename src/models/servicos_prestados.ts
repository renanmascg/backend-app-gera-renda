import mongoose, { Schema } from 'mongoose';

const ServicosPrestadosSchema: Schema = new Schema(
	{
		serviceId: { type: Schema.Types.ObjectId, ref: 'aki-service' },
		name: { type: String, required: true },
		description: { type: String, required: true },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('aki-servicosPrestados', ServicosPrestadosSchema);
