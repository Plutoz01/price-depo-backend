import { Required } from 'ts-express-decorators';

export class Address {
	@Required()
	country: string;

	@Required()
	postCode: string;

	@Required()
	settlement: string;

	@Required()
	street: string;

	@Required()
	number: string;
}