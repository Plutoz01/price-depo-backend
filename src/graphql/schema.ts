import { makeExecutableSchema } from 'graphql-tools';
import { IResolvers } from 'graphql-tools/dist/Interfaces';
import { productMemberResolvers, productResolver } from './resolvers/product.resolver';

const typeDefs = `
type Query {
	product( id: String ): Product
	products( page: Int! size: Int! ): [Product] 
}

type Product {
	id: String!
	name: String!
	barcode: String
	manufacturer: Manufacturer!
}

type Manufacturer {
	id: String!
	name: String!
	country: String!
}
`;

const queryResolvers: IResolvers = {
	Query: productResolver
};

export const schema = makeExecutableSchema( { typeDefs, resolvers: [ queryResolvers, productMemberResolvers ] } );
