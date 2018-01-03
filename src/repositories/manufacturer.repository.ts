import { Service } from 'ts-express-decorators';
import * as uuidv4 from 'uuid/v4';
import { Manufacturer } from '../models/entitites/manufacturer.class';

import { InMemoryRepositoryBase } from './base/in-memory-base.repository';

@Service()
export class ManufacturerRepository extends InMemoryRepositoryBase<Manufacturer, string> {

	initializeData() {
		const manufacturers: Manufacturer[] = [
			{ name: 'Bosch', country: 'Germany' },
			{ name: 'Toshiba', country: 'Japan' },
			{ name: 'Siemens', country: 'Germany' },
			{ name: 'Samsung', country: 'Korea' },
			{ name: 'Philips', country: 'Netherlands' },
			{ name: 'Fuji', country: 'Japan' },
			{ name: 'Canon', country: 'Japan' },
			{ name: 'Sony', country: 'Japan' },
			{ name: 'Acer', country: 'Taiwan' },
			{ name: 'Kingston', country: 'USA' },
			{ name: 'Sharp', country: 'Japan' },
			{ name: 'Huawei', country: 'China' },
			{ name: 'tp-link', country: 'China' },
			{ name: 'Xiaomi', country: 'China' },
			{ name: 'ZTE', country: 'China' },
			{ name: 'Alcatel', country: 'France' },
			{ name: 'Nokia', country: 'Finland' }
		];

		manufacturers.forEach( ( manufacturer: Manufacturer ) => {
			const id = this.generateNewIdFor();
			this.items.set( id, { ...manufacturer, id: id } );
		} );
	}

	protected generateNewIdFor(): string {
		return uuidv4();
	}
}