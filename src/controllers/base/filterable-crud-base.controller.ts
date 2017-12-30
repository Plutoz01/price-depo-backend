import { BodyParams, Post } from 'ts-express-decorators';
import { Description, Example, Summary } from 'ts-express-decorators/lib/swagger';
import { FilterBase } from '../../models/filters/filter.type';
import { Identifiable } from '../../models/identifiable.interface';
import { FilterableCrudRepository } from '../../repositories/base/filterable-crud-repository.interface';
import { CrudControllerBase } from './crud-base.controller';

export abstract class FilterableCrudControllerBase<T extends Identifiable<ID>, ID, F extends FilterBase<string>>
	extends CrudControllerBase<T, ID> {

	constructor( private readonly filterableCrudRepository: FilterableCrudRepository<T, ID, F> ) {
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
					) filter: F ): Promise<T[]> {
		// TODO: make filter results pageable
		return this.filterableCrudRepository.filterBy( filter );
	}

}