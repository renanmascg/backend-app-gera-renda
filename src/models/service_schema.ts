import mongoose, { Schema } from 'mongoose';
import ServicosPrestadosSchema from './servicos_prestados';

const ServiceSchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		location: {
			type: { type: String, default: 'Point' },
			coordinates: { type: [Number] },
		},
		endereco: { type: String, required: true },
		telefone: { type: String, required: true },
		categoria: {
			type: Schema.Types.ObjectId,
			ref: 'aki-categories',
			required: true,
		},
		formasPagamento: {
			type: Schema.Types.ObjectId,
			ref: 'aki-paymentmethods',
			required: true,
		},
		openingHour: {
			type: Schema.Types.ObjectId,
			ref: 'aki-openinghours',
			required: true,
		},
		services: { type: [ServicosPrestadosSchema], default: [] },
		descricao: { type: String, required: true },
		logoUrl: { type: String },
		qtdPessoasReview: { type: Number, default: 0 },
		reviewScore: { type: Number, default: 0.0 },
	},
	{
		timestamps: true,
	},
);

ServiceSchema.index({ location: '2dsphere' });

export default mongoose.model('aki-service', ServiceSchema);
