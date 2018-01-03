import { JsonProperty, Required } from 'ts-express-decorators';
import { Identifiable } from '../identifiable.interface';

export class Manufacturer implements Identifiable<string> {
	@JsonProperty()
	id?: string;

	@Required()
	name: string;

	@Required()
	country: string;
}