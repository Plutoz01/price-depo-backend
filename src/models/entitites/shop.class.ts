import { JsonProperty, Required } from 'ts-express-decorators';
import { Address } from './address.class';
import { Identifiable } from '../identifiable.interface';

export class Shop implements Identifiable<string> {
	@JsonProperty()
	id?: string;

	@Required()
	name: string;

	@Required()
	address: Address;

	@Required()
	chainStoreId?: string;
}