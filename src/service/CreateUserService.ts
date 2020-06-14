import User from '../models/UserModel';

interface RequestDTO {
	name: string;
	email: string;
	password: string;
}

class CreateUserService {
	public async execute({ name, email, password }: RequestDTO): Promise<User> {
		
	}
}

export default CreateUserService;
