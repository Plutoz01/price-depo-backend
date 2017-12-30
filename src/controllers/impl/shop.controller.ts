import { Controller } from 'ts-express-decorators';
import { Shop } from '../../models/entitites/shop.class';
import { ShopFilter } from '../../models/filters/shop-filter.type';
import { ShopRepository } from '../../repositories/shop.repository';
import { FilterableCrudControllerBase } from '../base/filterable-crud-base.controller';

@Controller( '/shops' )
export class ShopController extends FilterableCrudControllerBase<Shop, string, ShopFilter> {

	constructor( repository: ShopRepository ) {
		super( repository );
	}
}