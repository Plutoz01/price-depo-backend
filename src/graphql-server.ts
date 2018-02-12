import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { QueryContext } from './graphql/context/query.context';
import { schema } from './graphql/schema';

export class GraphqlServer {

	static readonly GRAPHQL_URL = 'graphql';

	private readonly app: express.Application = express();

	constructor( public readonly port: number = 3000, isGraphiqlEnabled = false ) {
		this.app.use( `/${ GraphqlServer.GRAPHQL_URL }`, bodyParser.json(), graphqlExpress( {
			schema,
			context: new QueryContext(),
			tracing: true
		} ) );
		if ( isGraphiqlEnabled ) {
			this.app.use( '/graphiql', graphiqlExpress( { endpointURL: '/graphql' } ) );
		}
	}

	start() {
		this.app.listen( this.port, () => {
			console.log( `Price-depo server (with GraphQL) is ready and listening on port ${ this.port }` );
		} );
	}
}
