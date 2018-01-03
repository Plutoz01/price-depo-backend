import { Identifiable } from '../../models/identifiable.interface';
import { CrudRepository } from './crud-repository.interface';
import { FilterableRepository } from './filterable-repository.interface';

export interface FilterableCrudRepository<T extends Identifiable<ID>, ID, FK extends string>
	extends CrudRepository<T, ID>, FilterableRepository<T, FK> {
}