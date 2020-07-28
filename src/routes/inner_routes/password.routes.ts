import { Router } from 'express';
import SendEmailForgotPasswordService from '../../service/password_services/SendEmailForgotPasswordService';

const passwordRouter = Router();

passwordRouter.post('/forgot', async (request, response) => {
	try {
		const { email } = request.body;

		const sendEmailForgotPassword = new SendEmailForgotPasswordService();

		await sendEmailForgotPassword.exec(email);

		return response.status(204).send();
	} catch (error) {
		return response.status(400).json({ error: error.message });
	}
});

export default passwordRouter;
