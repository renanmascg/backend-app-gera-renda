import moment from 'moment';
import { ServiceInterface } from '../../models/interfaces/service_interface';
import { DE_PARA_DATAS } from '../../shared/constants';
import OpeningHoursSchema from '../../models/opening_hours_schema';

interface IOpen {
	isOpen: boolean;
	start: number;
	end: number;
}

function isOpenNow(daysOpening: any): boolean {
	const hoje = moment();

	const diaSemana = DE_PARA_DATAS[hoje.weekday()];

	const day: IOpen = daysOpening[`${diaSemana}`];

	if (!day.isOpen) {
		return false;
	}

	const timeOpening = new Date().setHours(day.start, 0, 0, 0);
	const timeClose = new Date().setHours(day.end, 0, 0, 0);

	if (hoje.isSameOrAfter(timeOpening) && hoje.isBefore(timeClose)) {
		return true;
	}

	return false;
}

async function areServicesOpen(list: ServiceInterface[]): Promise<void> {
	const services = [];

	for (let i = 0; i < list.length; i++) {
		const openingHours = await OpeningHoursSchema.findOne({
			_id: list[i].openingHour,
		});

		list[i].horarioFuncionamento = openingHours?.toObject();
		list[i].isOpen = isOpenNow(openingHours);
	}
}

export default areServicesOpen;
