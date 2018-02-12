import { Manufacturer } from '../../models/entitites/manufacturer.class';
import { Product } from '../../models/entitites/product.class';
import { ManufacturerFilterKeys } from '../../models/filters/manufacturer-filter.type';
import { ProductFilterKeys } from '../../models/filters/product-filter.type';
import { FilterableCrudRepository } from '../../repositories/base/filterable-crud-repository.interface';
import { ManufacturerRepository } from '../../repositories/manufacturer.repository';
import { ProductRepository } from '../../repositories/product.repository';

export class RepositoryContext {
	public readonly productRepository: FilterableCrudRepository<Product, string, ProductFilterKeys>
		= new ProductRepository();
	public readonly manufacturerRepository: FilterableCrudRepository<Manufacturer, string, ManufacturerFilterKeys>
		= new ManufacturerRepository();
}
