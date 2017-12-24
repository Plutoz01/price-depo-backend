import { Controller } from 'ts-express-decorators';
import { Manufacturer } from '../../models/manufacturer.class';
import { ManufacturerRepository } from '../../repositories/manufacturer.repository';
import { CrudControllerBase } from '../base/crud-base.controller';

@Controller( '/manufacturers' )
export class ManufacturerController extends CrudControllerBase<Manufacturer, string> {

	constructor( manufacturerRepository: ManufacturerRepository ) {
		super( manufacturerRepository );
	}
}