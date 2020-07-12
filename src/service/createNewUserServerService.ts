import { Document } from 'mongoose';

import OpeningHoursSchema from '../models/opening_hours_schema';
import PaymentMethodsSchema from '../models/payment_methods_schema';
import S3StorageProvider from '../database/S3StorageProvider';
import ServiceSchema from '../models/service_schema';

interface RequestDTO {
	name: string;
	lat: number;
	long: number;
	endereco: string;
	telefone: string;
	formasPagamento: any;
	daysOpening: any;
	descricao: string;
	categoria: string;
	image?: Express.Multer.File;
}

interface ServiceParamsInterface {
	name: string;
	lat: number;
	long: number;
	endereco: string;
	telefone: string;
	formasPagamentoId: string;
	openHoursId: string;
	descricao: string;
	categoria: string;
}

interface SaveAwsInterface {
	serviceId: string;
	name: string;
	image: Express.Multer.File;
}

class CreateNewUserServer {
	public async exec({
		name,
		lat,
		long,
		endereco,
		telefone,
		formasPagamento,
		daysOpening,
		descricao,
		categoria,
		image,
	}: RequestDTO): Promise<Document> {
		const openHours = await this.createOpeningHours(daysOpening);

		const paymentMethods = await this.createPaymentMethods(formasPagamento);

		const newService = await this.createNewService({
			name,
			lat,
			long,
			endereco,
			telefone,
			categoria,
			formasPagamentoId: paymentMethods.id,
			openHoursId: openHours.id,
			descricao,
		});

		return newService;
	}

	private async createOpeningHours(daysOpening: any): Promise<Document> {
		try {
			const openHours = await OpeningHoursSchema.create(daysOpening);

			return openHours;
		} catch (error) {
			throw Error('Error creating new service.');
		}
	}

	private async createPaymentMethods(paymentMethods: any): Promise<Document> {
		try {
			const methods = await PaymentMethodsSchema.create(paymentMethods);

			return methods;
		} catch (error) {
			throw Error('Error creating payment method.');
		}
	}

	private async createNewService({
		name,
		lat,
		long,
		endereco,
		telefone,
		formasPagamentoId,
		openHoursId,
		descricao,
		categoria,
	}: ServiceParamsInterface): Promise<Document> {
		try {
			const newService = await ServiceSchema.create({
				name,
				location: {
					coordinates: [lat, long],
				},
				categoria,
				endereco,
				telefone,
				formasPagamento: formasPagamentoId,
				openingHour: openHoursId,
				descricao,
			});

			return newService;
		} catch (error) {
			console.log(error);
			throw Error('Error creating new Service');
		}
	}

	private async createAndSaveUserLogoAWS({
		serviceId,
		image,
		name,
	}: SaveAwsInterface): Promise<Document | null> {
		const S3Storage = new S3StorageProvider();

		try {
			const imageName = `${name}.png`;

			const logoUrl = await S3Storage.uploadFileToAWS({
				file: image,
				name: `categorias/${imageName}`,
			});

			const updatedService = await ServiceSchema.findOneAndUpdate(
				{
					_id: serviceId,
				},
				{
					logoUrl,
				},
				{
					new: true,
				},
			);

			return updatedService;
		} catch (e) {
			console.log(e);
			throw Error('Error uploading image logo to aws.');
		}
	}
}

export default CreateNewUserServer;
