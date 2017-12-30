import { FilterBase, FilterElement, FilterMatchType } from '../../models/filters/filter.type';
import { Identifiable } from '../../models/identifiable.interface';
import { FilterableRepository } from './filterable-repository.interface';
import { InMemoryRepositoryBase } from './in-memory-base.repository';
import * as _ from 'lodash';

export abstract class FilterableInMemoryBaseRepository<T extends Identifiable<ID>, ID, F extends FilterBase<string>>
	extends InMemoryRepositoryBase<T, ID>
	implements FilterableRepository<T, F> {

	async filterBy( filter: F ): Promise<T[]> {

		const filterKeys: string[] = Object.keys( filter );
		// TODO: some validation to check, key is member of desired filterable type

		return filterKeys.reduce( ( partial: T[], filterKey: string ): T[] => {
			return partial.filter( this.createFilterFn( filterKey, filter[ filterKey ] ) );
		}, this.values );
	}

	createFilterFn( key: string, filterElement: FilterElement ): ( item: T ) => boolean {
		switch ( filterElement.matchType ) {
			case FilterMatchType.contains:
				// TODO: minimum search expr length
				return this.createContainsFilterFn( key, filterElement.value );
			case FilterMatchType.equals:
				return this.createEqualsFilterFn( key, filterElement.value );
			default:
				throw new Error( 'unhandled filter match type: ' + filterElement.matchType );
		}
	}

	createContainsFilterFn( key: string, expectedValue: string ): ( item: T ) => boolean {
		return ( item: T ) => {
			const actualValue = _.get( item, key, '' );
			if ( !actualValue ) {
				return false;
			}

			return actualValue.toString().toLocaleLowerCase().includes( expectedValue.toLocaleLowerCase() );
		};
	}

	createEqualsFilterFn( key: string, expectedValue: string ): ( item: T ) => boolean {
		return ( item: T ) => {
			const actualValue = _.get( item, key, '' );
			if ( !actualValue ) {
				return false;
			}

			return actualValue.toString().toLocaleLowerCase() === expectedValue.toLocaleLowerCase();
		};
	}

}