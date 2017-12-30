import { FilterBase } from '../../models/filters/filter.type';
import { Identifiable } from '../../models/identifiable.interface';

export interface FilterableRepository<T extends Identifiable<any>, F extends FilterBase<any>> {
	filterBy( filter: F ): Promise<T[]>;
}
