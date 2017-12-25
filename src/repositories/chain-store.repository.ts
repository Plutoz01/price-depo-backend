import { Service } from 'ts-express-decorators';
import * as uuidv4 from 'uuid/v4';
import { ChainStore } from '../models/chain-store.class';

import { InMemoryRepositoryBase } from './base/in-memory-base.repository';

@Service()
export class ChainStoreRepository extends InMemoryRepositoryBase<ChainStore, string> {

	initializeData() {
		const initialData: ChainStore[] = [
			{ name: 'Tesco', website: 'https://www.tesco.com' },
			{ name: 'IKEA', website: 'http://www.ikea.com' },
			{ name: 'Auchan', website: 'https://www.auchan-retail.com' }

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