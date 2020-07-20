import mongoose, { Schema } from 'mongoose';

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
		descricao: { type: String, required: true },
		logoUrl: { type: String },
		qtdPessoasContato: { type: Number, default: 0 },
		reviewScore: { type: Number, default: 0.0 },
	},
	{
		timestamps: true,
	},
);

ServiceSchema.index({ location: '2dsphere' });

export default mongoose.model('aki-service', ServiceSchema);
