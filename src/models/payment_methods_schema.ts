import mongoose, { Schema } from 'mongoose';

const PaymentMethodsSchema: Schema = new Schema(
	{
		debito: { type: [String], required: true },
		credito: { type: [String], required: true },
		dinheiro: { type: Boolean, required: true },
		refeicao: { type: [String], required: true },
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('aki-paymentmethods', PaymentMethodsSchema);
