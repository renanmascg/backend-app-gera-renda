import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UserSchema from '../../models/user_models/user_schema';
import { UserInterface } from '../../models/interfaces/user_interface';

interface RequestDTO {
	email: string;
	password: string;
}

interface Response {
	user: UserInterface;
	token: string;
}

class AuthenticateUserService {
	public async execute({ email, password }: RequestDTO): Promise<Response> {
		const user = await UserSchema.findOne({ email });

		if (!user) {
			throw new Error('Incorrect email/password combination.');
		}

		const userObj: UserInterface = user.toObject();

		const passwordMatched = await compare(password, userObj.password);

		if (!passwordMatched) {
			throw new Error('Incorrect email/password combination.');
		}

		const token = sign({}, 'a83920d1348eee579e4d5e2037b93657', {
			subject: user.id,
			expiresIn: '3m',
		});

		return { user: userObj, token };
	}
}

export default AuthenticateUserService;
