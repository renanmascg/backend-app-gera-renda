import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserSchema from '../models/user_models/user_schema';
import { UserInterface } from '../models/interfaces/user_interface';
import configs from '../config/auth';

interface RequestDTO {
	name: string;
	email: string;
	password: string;
}

interface Response {
	user: UserInterface;
	token: string;
}

class CreateUserService {
	public async exec({ name, email, password }: RequestDTO): Promise<Response> {
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

		const token = sign({}, configs.jwt.secret, {
			subject: user.id,
			expiresIn: configs.jwt.expiresIn,
		});

		return { user: user.toObject(), token };
	}
}

export default CreateUserService;
