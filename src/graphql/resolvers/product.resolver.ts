import { IResolvers } from 'graphql-tools/dist/Interfaces';
import { Manufacturer } from '../../models/entitites/manufacturer.class';
import { Product } from '../../models/entitites/product.class';
import { Pageable } from '../../models/pageable.class';
import { QueryContext } from '../context/query.context';

export const productResolver: IResolvers = {
	product: getProductById,
	products: getAllProducts,
};

export const productMemberResolvers: IResolvers = {
	Product: {
		manufacturer: getManufacturerByProduct
	}
};

export function getProductById( obj, args, context: QueryContext ): Promise<Product | undefined> {
	const id = args.id;
	return context.repositories.productRepository.getById( id );
}

export function getAllProducts( obj, args, context: QueryContext ): Promise<Product[]> {
	const pageable = Pageable.of( args.page, args.size );
	return context.repositories.productRepository.getAll( pageable );
}

export function getManufacturerByProduct( product: Product, args, context: QueryContext ): Promise<Manufacturer | undefined> {
	return context.repositories.manufacturerRepository.getById( product.manufacturerId );
}
