import { Identifiable } from '../../models/identifiable.interface';
import { Pageable } from '../../models/pageable';
import { CrudRepository } from './crud-repository.interface';

export abstract class InMemoryRepositoryBase <T extends Identifiable<ID>, ID> implements CrudRepository<T, ID> {

	private readonly _items = new Map<ID, T>();

	constructor() {
		this.initializeData();
	}

	protected abstract initializeData();

	async getById( id: ID ): Promise<T | undefined> {
		return this._items.get( id );
	}

	async getAll( pageable: Pageable ): Promise<T[]> {
		return this.values.slice( pageable.firstIndex, pageable.lastIndex )
	}

	async save( entity: T ): Promise<T> {
		if ( !entity.id ) {
			entity.id = this.generateNewIdFor( entity );
		}

		this._items.set( entity.id, entity );
		return entity;

	}
	async saveAll( entities: T[] ): Promise<T[]> {
		if ( !!entities && Array.isArray( entities ) ) {
			entities.forEach( ( entity: T ) => this.save( entity ) );
			return entities;
		} else {
			throw new Error( 'invalid entity array: ' + entities );
		}
	}
	async remove( id: ID ): Promise<null> {
		this._items.delete( id );
		return null;
	}
	async removeAll( ids: ID[] ): Promise<null> {
		if ( !!ids && Array.isArray( ids ) ) {
			ids.forEach( ( id: ID ) => this.remove( id ) );
			return null;
		} else {
			throw new Error( 'invalid entity array: ' + ids );
		}
	}
	async count(): Promise<number> {
		return this._items.size;
	}

	protected get items(): Map<ID, T> {
		return this._items;
	}

	protected get values(): Array<T> {
		return Array.from( this._items.values() );
	}

	protected abstract generateNewIdFor( entity: T ): ID;
}