import { Service } from 'ts-express-decorators';
import * as uuidv4 from 'uuid/v4';
import { initialProducts } from '../data/product.data';
import { Product } from '../models/entitites/product.class';
import { ProductFilterKeys } from '../models/filters/product-filter.type';
import { FilterableInMemoryBaseRepository } from './base/filterable-in-memory-base.repository';

@Service()
export class ProductRepository extends FilterableInMemoryBaseRepository<Product, string, ProductFilterKeys> {

	initializeData() {
		initialProducts
			.filter( ( item ) => !!item.id )
			.forEach( item => this.items.set( <string>item.id, item ) );
	}

	protected generateNewIdFor(): string {
		return uuidv4();
	}
}
