import { GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from 'ts-express-decorators';
import "ts-express-decorators/swagger";
import * as Path from 'path';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as compression from 'compression';
import * as bodyParser from 'body-parser';

const rootDir = Path.resolve( __dirname );

@ServerSettings( {
	rootDir: rootDir,
	componentsScan: [
		`${ rootDir }/repositories/**/**.js`
	],
	mount: {
		'/api/v1': '${rootDir}/controllers/**/*.js'
	},
	acceptMimes: [ 'application/json' ],
	port: 3000,
	httpsPort: false,
	swagger: {
		path: "/api-docs"
	}
} )
export class APIServer extends ServerLoader {


	/**
	 * This method let you configure the middleware required by your application to works.
	 * @returns {Server}
	 */
	public $onMountingMiddlewares(): void | Promise<any> {
		this
			.use( morgan( 'dev' ) )
			.use( GlobalAcceptMimesMiddleware )
			.use( compression( {} ) )
			.use( cors() )
			.use( bodyParser.json() )
			.use( bodyParser.urlencoded( {
				extended: true
			} ) );
	}

	public $onReady() {
		console.log( 'Server started...' );
	}

	public $onServerInitError( err ) {
		console.error( err );
	}
}