import { ServiceInterface } from '../../models/interfaces/service_interface';

import PaymentMethodsSchema from '../../models/payment_methods_schema';

async function getFormasPagamento(list: ServiceInterface[]): Promise<void> {
	for (let i = 0; i < list.length; i++) {
		const paymentMethods = await PaymentMethodsSchema.findOne({
			_id: list[i].formasPagamento,
		});

		list[i].formasPagamento = paymentMethods?.toObject();
	}
}

export default getFormasPagamento;
