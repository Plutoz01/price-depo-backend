import { BodyParams, Delete, Get, PathParams, Post, Put } from 'ts-express-decorators';
import { BadRequest, Conflict, NotFound } from 'ts-httpexceptions';
import { Identifiable } from '../../models/identifiable.interface';
import { CrudRepository } from '../../repositories/base/crud-repository.interface';

export abstract class CrudControllerBase<T extends Identifiable<ID>, ID> {

	constructor( private repository: CrudRepository<T, ID> ) {
	}

	@Get( '/:entityId' )
	async getById( @PathParams( 'entityId' ) id: ID ): Promise<T> {
		const found = await this.repository.getById( id );
		if ( !found ) {
			throw new NotFound( 'Entity does not exists' );
		}
		return found;
	}

	@Get( '/' )
	async getAll(): Promise<T[]> {
		return this.repository.getAll();
	}

	@Post( '/' )
	async create( @BodyParams() newEntity: T ): Promise<T> {
		// force to override id to avoid accidental update
		newEntity.id = undefined;
		return this.repository.save( newEntity );
	}

	@Put( '/:entityId' )
	async update( @PathParams( 'entityId' ) existingId: ID, entityToUpdate: T ): Promise<T> {
		if ( !entityToUpdate ) {
			throw new BadRequest( 'Request body missing.' );
		} else if ( !existingId ) {
			throw new BadRequest( 'Identifier of existing entity missing from url.' );
		} else if ( entityToUpdate.id !== existingId ) {
			throw new Conflict(
				`Identifier in url (${ existingId }) not match with identifier in body (${ entityToUpdate.id }).`
			);
		} else {
			const found = this.getById( existingId );
			if ( !found ) {
				throw new NotFound( 'Entity to update does not exists.' );
			}
			return this.repository.save( entityToUpdate );
		}
	}

	@Delete( '/:entityId' )
	async remove( @PathParams( 'entityId' ) id: ID ): Promise<void> {
		const found = this.getById( id );
		if ( !found ) {
			throw new NotFound( 'Entity does not exists' );
		}
		return this.repository.remove( id );
	}
}
