import { Controller } from 'ts-express-decorators';
import { Product } from '../../models/entitites/product.class';
import { ProductFilterKeys } from '../../models/filters/product-filter.type';
import { ProductRepository } from '../../repositories/product.repository';
import { FilterableCrudControllerBase } from '../base/filterable-crud-base.controller';

@Controller( '/products' )
export class ProductController extends FilterableCrudControllerBase<Product, string, ProductFilterKeys> {

	constructor( repository: ProductRepository ) {
		super( repository );
	}
}
