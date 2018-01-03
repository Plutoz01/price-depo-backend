import { Controller } from 'ts-express-decorators';

import { CrudControllerBase } from '../base/crud-base.controller';
import { User } from '../../models/entitites/user.class';
import { UserRepository } from '../../repositories/user.repository';

@Controller( '/users' )
export class UserController extends CrudControllerBase<User, string> {

	constructor( userRepository: UserRepository ) {
		super( userRepository );
	}
}
