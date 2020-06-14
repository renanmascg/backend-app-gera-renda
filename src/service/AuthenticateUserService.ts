import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/UserModel';

interface RequestDTO {
	email: string;
	password: string;
}

interface Response {
	user: User;
	token: string;
}

class AuthenticateUserService {
	public async execute({ email, password }: RequestDTO): Promise<Response> {
		const userRepository = getRepository(User);

		const user = await userRepository.findOne({
			where: { email },
		});

		if (!user) {
			throw new Error('Incorrect email/password combination.');
		}

		const passwordCheck = await compare(password, user.password);

		if (!passwordCheck) {
			throw new Error('Incorrect email/password combination.');
		}

		const token = sign({}, '04fd37734aa9de5526d67595a6ac9b33', {
			subject: user.id,
			expiresIn: '1d',
		});

		return {
			user,
			token,
		};
	}
}

export default AuthenticateUserService;
