import { JsonProperty, Required } from 'ts-express-decorators';
import { Identifiable } from './identifiable.interface';

export class ChainStore implements Identifiable<string> {
	@JsonProperty()
	id?: string;

	@Required()
	name: string;

	@Required()
	website: string;
}