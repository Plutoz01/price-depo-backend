import { Controller } from 'ts-express-decorators';
import { Manufacturer } from '../../models/entitites/manufacturer.class';
import { ManufacturerFilterKeys } from '../../models/filters/manufacturer-filter.type';
import { ManufacturerRepository } from '../../repositories/manufacturer.repository';
import { FilterableCrudControllerBase } from '../base/filterable-crud-base.controller';

@Controller( '/manufacturers' )
export class ManufacturerController extends FilterableCrudControllerBase<Manufacturer, string, ManufacturerFilterKeys> {

	constructor( manufacturerRepository: ManufacturerRepository ) {
		super( manufacturerRepository );
	}
}
