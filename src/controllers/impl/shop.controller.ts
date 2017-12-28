import { Controller } from 'ts-express-decorators';
import { Shop } from '../../models/shop.class';
import { ShopRepository } from '../../repositories/shop.repository';
import { CrudControllerBase } from '../base/crud-base.controller';

@Controller( '/shops' )
export class ShopController extends CrudControllerBase<Shop, string> {

	constructor( repository: ShopRepository ) {
		super( repository );
	}
}