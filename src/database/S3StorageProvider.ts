import aws, { S3 } from 'aws-sdk';

interface FileInterface {
	file: Express.Multer.File;
	name: string;
	contentType?: string;
}

class S3StorageProvider {
	private client: S3;

	constructor() {
		this.client = new aws.S3({
			region: 'sa-east-1',
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
		});
	}

	public async uploadFileToAWS({ file, name }: FileInterface): Promise<string> {
		try {
			const params = {
				Bucket: 'achaki-app',
				Key: name,
				Body: file.buffer,
				ContentType: 'image/png',
				ACL: 'public-read',
			};

			const url = this.client.getSignedUrl('putObject', params).split('?')[0];

			console.log(url);

			await this.client.putObject(params).promise();

			return url;
		} catch (e) {
			throw Error('Error uploading file.');
		}
	}

	public async uploadLogoFileToAWS({
		file,
		name,
		contentType,
	}: FileInterface): Promise<string> {
		try {
			const params = {
				Bucket: 'achaki-app',
				Key: name,
				Body: file.buffer,
				ContentType: contentType,
				ACL: 'public-read',
			};

			const url = this.client.getSignedUrl('putObject', params).split('?')[0];

			await this.client.putObject(params).promise();

			return url;
		} catch (e) {
			throw Error('Error uploading file.');
		}
	}
}

export default S3StorageProvider;
