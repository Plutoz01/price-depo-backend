import { Service } from 'ts-express-decorators';
import { initialChainStores } from '../data/chain-store.data';
import * as uuidv4 from 'uuid/v4';
import { ChainStore } from '../models/chain-store.class';

import { InMemoryRepositoryBase } from './base/in-memory-base.repository';

@Service()
export class ChainStoreRepository extends InMemoryRepositoryBase<ChainStore, string> {

	initializeData() {
		initialChainStores.forEach( chainStore => this.items.set( chainStore.id, chainStore ) );
	}

	protected generateNewIdFor(): string {
		return uuidv4();
	}
}