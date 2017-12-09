import { GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from 'ts-express-decorators';
import "ts-express-decorators/swagger";
import Path = require('path');

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
		const compress = require( 'compression' ),
			bodyParser = require( 'body-parser' ),
			morgan = require( 'morgan' );

		this
			.use( morgan( 'dev' ) )
			.use( GlobalAcceptMimesMiddleware )
			.use( compress( {} ) )
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