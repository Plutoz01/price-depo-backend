import { Identifiable } from '../../models/identifiable.interface';
import { Pageable } from '../../models/pageable.class';

export interface CrudRepository <T extends Identifiable<ID>, ID> {
	getAll( page: Pageable ): Promise<T[]>;
	getById( id: ID ): Promise<T | undefined>;
	save( entity: T ): Promise<T>;
	saveAll?( entities: T[] ): Promise<T[]>;
	remove( id: ID ): Promise<null>;
	removeAll?( ids: ID[] ): Promise<null>;
	count(): Promise<number>;
}