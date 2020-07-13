import { hash } from 'bcryptjs';
import UserSchema from '../models/user_models/user_schema';
import { UserInterface } from '../models/interfaces/user_interface';

interface RequestDTO {
	name: string;
	email: string;
	password: string;
}

class CreateUserService {
	public async exec({
		name,
		email,
		password,
	}: RequestDTO): Promise<UserInterface> {
		const checkUserExists = await UserSchema.findOne({ email });

		if (checkUserExists) {
			throw new Error('Email address already used.');
		}

		const hashedPassword = await hash(password, 8);

		const user = await UserSchema.create({
			name,
			email,
			password: hashedPassword,
		});

		return user.toObject();
	}
}

export default CreateUserService;
