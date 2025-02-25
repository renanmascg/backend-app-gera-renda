import { Router } from 'express';
import AuthenticateUserService from '../../service/sessions_services/AuthenticateSessionsService';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
	try {
		const { email, password } = request.body;

		const authenticateUser = new AuthenticateUserService();

		const { user, token } = await authenticateUser.execute({
			email,
			password,
		});

		delete user.password;

		return response.json({ user, token });
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
});

sessionsRouter.get(
	'/validate-token',
	ensureAuthenticated,
	async (_, response) => {
		return response.send();
	},
);

export default sessionsRouter;
