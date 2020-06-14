import { uuid } from 'uuidv4';

interface UserInterface {
	name: string;
	email: string;
	password: string;
}

class User {
	id: string;

	name: string;

	email: string;

	password: string;

	// created_at: Date;

	// updated_at: Date;

	constructor({ name, email, password }: UserInterface) {
		this.id = uuid();
		this.name = name;
		this.password = password;
		this.email = email;
	}
}

export default User;
