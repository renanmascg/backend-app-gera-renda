import { ServiceInterface } from './service_interface';

export default interface TakenServiceInterface {
	userId: string;
	serviceId: string;
	isRated: boolean;
	isServiceDone: boolean;
	rate: number;
	text: string;
	userImageUrl?: string;
	serviceInfo?: ServiceInterface;
}
