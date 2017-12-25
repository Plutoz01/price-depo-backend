import { Controller } from 'ts-express-decorators';
import { ChainStore } from '../../models/chain-store.class';
import { ChainStoreRepository } from '../../repositories/chain-store.repository';
import { CrudControllerBase } from '../base/crud-base.controller';

@Controller( '/chain-stores' )
export class ChainStoreController extends CrudControllerBase<ChainStore, string> {

	constructor( repository: ChainStoreRepository ) {
		super( repository );
	}
}