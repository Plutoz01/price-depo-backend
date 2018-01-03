import { FilterBase } from '../../models/filters/filter.type';
import { Identifiable } from '../../models/identifiable.interface';

export interface FilterableRepository<T extends Identifiable<any>, FK extends string> {
	filterBy( filter: FilterBase<FK> ): Promise<T[]>;
}
