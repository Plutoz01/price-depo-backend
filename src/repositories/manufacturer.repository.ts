import { Service } from 'ts-express-decorators';
import * as uuidv4 from 'uuid/v4';
import { initialManufacturers } from '../data/manufacturer.data';
import { Manufacturer } from '../models/entitites/manufacturer.class';
import { ManufacturerFilterKeys } from '../models/filters/manufacturer-filter.type';
import { FilterableInMemoryBaseRepository } from './base/filterable-in-memory-base.repository';

@Service()
export class ManufacturerRepository extends FilterableInMemoryBaseRepository<Manufacturer, string, ManufacturerFilterKeys> {

	initializeData() {
		initialManufacturers
			.filter( ( item ) => !!item.id )
			.forEach( item => this.items.set( <string>item.id, item ) );
	}

	protected generateNewIdFor(): string {
		return uuidv4();
	}
}