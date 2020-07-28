import nodemailer from 'nodemailer';
import aws from 'aws-sdk';
import Mail from 'nodemailer/lib/mailer';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailProvider from '../models/IMailProvider';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from '../../MailTemplateProvider/implementations/HandlebarsMailTemplateProvider';

class SESMailProvider implements IMailProvider {
	private client: Mail;

	private mailTemplateProvider: IMailTemplateProvider;

	constructor() {
		this.mailTemplateProvider = new HandlebarsMailTemplateProvider();

		this.client = nodemailer.createTransport({
			SES: new aws.SES({
				apiVersion: '2010-12-01',
				region: process.env.AWS_DEFAULT_REGION,
			}),
		});
	}

	public async sendMail({
		to,
		from,
		subject,
		templateData,
	}: ISendMailDTO): Promise<void> {
		await this.client.sendMail({
			from: {
				name: from?.name || 'Equipe Achaki',
				address: from?.email || 'equipe@achaki.net',
			},
			to: {
				name: to.name,
				address: to.email,
			},
			subject,
			html: await this.mailTemplateProvider.parse(templateData),
		});
	}
}

export default SESMailProvider;
