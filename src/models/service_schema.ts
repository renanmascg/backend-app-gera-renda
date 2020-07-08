import mongoose, { Schema } from 'mongoose';

const ServiceSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		lat: { type: Number, required: true },
		long: { type: Number, required: true },
		endereco: { type: String, required: true },
		reviewScore: { type: Number, default: 0.0 },
		telefone: { type: String, required: true },
		categoria: {
			type: Schema.Types.ObjectId,
			ref: 'aki-categories',
			required: true,
		},
		formasPagamento: { type: [String], required: true },
		descricao: { type: String, required: true },
		qtdPessoasContato: { type: Number, default: 0 },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('aki-service', ServiceSchema);
