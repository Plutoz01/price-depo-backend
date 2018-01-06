import { JsonProperty, Required } from 'ts-express-decorators';
import { Identifiable } from '../identifiable.interface';

export class Product implements Identifiable<string> {
	@JsonProperty()
	id?: string;

	@Required()
	name: string;

	@JsonProperty()
	barcode?: string;

	@Required()
	manufacturerId: string;
}