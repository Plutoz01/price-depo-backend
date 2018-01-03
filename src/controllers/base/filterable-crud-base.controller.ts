import { BodyParams, Post } from 'ts-express-decorators';
import { Description, Example, Summary } from 'ts-express-decorators/lib/swagger';
import { FilterBase } from '../../models/filters/filter.type';
import { Identifiable } from '../../models/identifiable.interface';
import { FilterableCrudRepository } from '../../repositories/base/filterable-crud-repository.interface';
import { CrudControllerBase } from './crud-base.controller';

export abstract class FilterableCrudControllerBase<T extends Identifiable<ID>, ID, FK extends string>
	extends CrudControllerBase<T, ID> {

	constructor( private readonly filterableCrudRepository: FilterableCrudRepository<T, ID, FK> ) {
		super( filterableCrudRepository );
	}

	@Post( '/filter' )
	@Summary( 'Get all entities satisfies conditions defined in body' )
	async filterBy( @BodyParams() @Description( 'filter conditions' )
					@Example(
						`{
							"name": {
								"value": "esC",
								"matchType": "contains"
							},
							"address.country": {
								"value": "GB",
								"matchType": "equals"
							}
						}`
					) filter: FilterBase<FK> ): Promise<T[]> {
		// TODO: make filter results pageable
		// TODO: restrict filter to allow only key listed in FK and reject for unlisted hits
		return this.filterableCrudRepository.filterBy( filter );
	}

}