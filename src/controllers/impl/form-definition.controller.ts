import { Controller } from 'ts-express-decorators';
import { DynamicFormDef } from '../../models/entitites/form-definitions.class';
import { FormDefinitionRepository } from '../../repositories/form-definition.repository';
import { CrudControllerBase } from '../base/crud-base.controller';

@Controller( '/form-definitions' )
export class FormDefinitionController extends CrudControllerBase<DynamicFormDef, string> {

	constructor( repository: FormDefinitionRepository ) {
		super( repository );
	}
}