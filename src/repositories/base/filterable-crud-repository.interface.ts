import { FilterBase } from '../../models/filters/filter.type';
import { Identifiable } from '../../models/identifiable.interface';
import { CrudRepository } from './crud-repository.interface';
import { FilterableRepository } from './filterable-repository.interface';

export interface FilterableCrudRepository<T extends Identifiable<ID>, ID, F extends FilterBase<any>>
	extends CrudRepository<T, ID>, FilterableRepository<T, F> {
}