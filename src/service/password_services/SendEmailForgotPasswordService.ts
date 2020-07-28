import path from 'path';
import SESMailProvider from '../../shared/container/providers/MailProvider/implementations/SESMailProvider';

class SendEmailForgotPasswordService {
	public async exec(email: string): Promise<void> {
		try {
			const emailSender = new SESMailProvider();

			const forgotPasswordTemplate = path.resolve(
				__dirname,
				'..',
				'views',
				'forgot_password.hbs',
			);

			await emailSender.sendMail({
				to: {
					name: 'Renan Mascarenhas Gonçalves',
					email,
				},
				subject: 'Nova pessoa com Covid',
				templateData: {
					file: forgotPasswordTemplate,
					variable: {
						name: 'Renan',
						token: '123456',
					},
				},
			});
		} catch (error) {
			console.log(error);
			throw Error('Email could not be sent');
		}
	}
}

export default SendEmailForgotPasswordService;
