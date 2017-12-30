import { Service } from 'ts-express-decorators';
import * as uuidv4 from 'uuid/v4';

import { Shop } from '../models/entitites/shop.class';
import { ShopFilter } from '../models/filters/shop-filter.type';
import { FilterableInMemoryBaseRepository } from './base/filterable-in-memory-base.repository';

@Service()
export class ShopRepository extends FilterableInMemoryBaseRepository<Shop, string, ShopFilter> {

	initializeData() {

		const initialData: Shop[] = [
			{
				name: 'Tesco NO°32', address: {
					country: 'GB',
					postCode: '45677',
					settlement: 'Bristol',
					street: 'Baker street',
					number: '147/A'
				},
				chainStoreId: 'id_tesco'
			}
		];

		initialData.forEach( item => {
			const id = this.generateNewIdFor();
			this.items.set( id, { ...item, id: id } );
		} );
	}

	protected generateNewIdFor(): string {
		return uuidv4();
	}
}
