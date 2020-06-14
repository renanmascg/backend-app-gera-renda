import { Router } from 'express';
import CreateUserService from '../../service/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', (request, response) => {
	const { email, password } = request.body;

	const createUserService = new CreateUserService();
});

export default usersRouter;
