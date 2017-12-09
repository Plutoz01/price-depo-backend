import { JsonProperty, Required } from 'ts-express-decorators';
import { Email } from 'ts-express-decorators/lib/ajv';
import { Identifiable } from './identifiable.interface';

export class User implements Identifiable<string> {
	@JsonProperty()
	id: string;

	@Required()
	userName: string;

	@Required()
	@Email()
	email: string;
}