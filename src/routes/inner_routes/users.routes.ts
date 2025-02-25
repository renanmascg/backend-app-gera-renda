import { Router } from 'express';

import CreateUserService from '../../service/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
	try {
		const { name, email, password } = request.body;

		const createUser = new CreateUserService();

		const user = await createUser.exec({
			name,
			email,
			password,
		});

		delete user.user.password;

		return response.json(user);
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
});

export default usersRouter;
