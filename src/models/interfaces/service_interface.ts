export interface LocationInterface {
	type: string;
	coordinates: number[];
}

export interface ServiceInterface {
	location: LocationInterface;
	email: string;
	categorieUrl: string;
	distance: string;
	qtdPessoasContato: number;
	reviewScore: number;
	_id: string;
	name: string;
	categoria: string;
	endereco: string;
	telefone: string;
	formasPagamento: any;
	openingHour: string;
	horarioFuncionamento: any;
	descricao: string;
	createdAt: Date;
	updatedAt: Date;
	logoUrl: string;
	isOpen: boolean;
	services: any;
	__v: number;
}
