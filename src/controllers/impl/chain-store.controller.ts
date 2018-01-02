import { Controller } from 'ts-express-decorators';
import { ChainStore } from '../../models/entitites/chain-store.class';
import { ChainStoreFilterKeys } from '../../models/filters/chain-store-filter.type';
import { ChainStoreRepository } from '../../repositories/chain-store.repository';
import { FilterableCrudControllerBase } from '../base/filterable-crud-base.controller';

@Controller( '/chain-stores' )
export class ChainStoreController extends FilterableCrudControllerBase<ChainStore, string, ChainStoreFilterKeys> {

	constructor( repository: ChainStoreRepository ) {
		super( repository );
	}
}