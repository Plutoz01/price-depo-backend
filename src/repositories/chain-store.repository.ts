import { Service } from 'ts-express-decorators';
import * as uuidv4 from 'uuid/v4';
import { initialChainStores } from '../data/chain-store.data';
import { ChainStore } from '../models/entitites/chain-store.class';
import { ChainStoreFilterKeys } from '../models/filters/chain-store-filter.type';
import { FilterableInMemoryBaseRepository } from './base/filterable-in-memory-base.repository';

@Service()
export class ChainStoreRepository extends FilterableInMemoryBaseRepository<ChainStore, string, ChainStoreFilterKeys> {

	initializeData() {
		initialChainStores.forEach( chainStore => this.items.set( chainStore.id, chainStore ) );
	}

	protected generateNewIdFor(): string {
		return uuidv4();
	}
}