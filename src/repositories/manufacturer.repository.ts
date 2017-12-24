import { Service } from 'ts-express-decorators';
import * as uuidv4 from 'uuid/v4';
import { Manufacturer } from '../models/manufacturer.class';

import { InMemoryRepositoryBase } from './base/in-memory-base.repository';

@Service()
export class ManufacturerRepository extends InMemoryRepositoryBase<Manufacturer, string> {

	initializeData() {
		const manufacturers: Manufacturer[] = [
			{ name: 'Bosch', country: 'Germany' },
			{ name: 'Toshiba', country: 'Japan' },
			{ name: 'Siemens', country: 'Germany' },
			{ name: 'Samsung', country: 'Korea' }
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