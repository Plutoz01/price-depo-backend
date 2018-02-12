import { APIServer } from "./api-server";
import { GraphqlServer } from './graphql-server';

const shouldUseGraphQL = !!process.env.GRAPHQL_ENABLED ? ( process.env.GRAPHQL_ENABLED.toLocaleLowerCase() === 'true' ) : false;

if( shouldUseGraphQL ) {
	const isGraphiqlEnabled = !!process.env.GRAPHIQL_ENABLED ? ( process.env.GRAPHIQL_ENABLED.toLocaleLowerCase() === 'true' ) : false;

	const serverInst = new GraphqlServer( 3000, isGraphiqlEnabled );
	serverInst.start();
} else {
	const serverInst = new APIServer();
	serverInst.start();
}
