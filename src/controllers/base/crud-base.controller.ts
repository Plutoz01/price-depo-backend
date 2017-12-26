import { BodyParams, Delete, Get, PathParams, Post, Put, QueryParams, Status } from 'ts-express-decorators';
import { Description, Returns, Summary } from 'ts-express-decorators/lib/swagger';
import { BadRequest, Conflict, NotFound } from 'ts-httpexceptions';
import { Identifiable } from '../../models/identifiable.interface';
import { Pageable } from '../../models/pageable';
import { CrudRepository } from '../../repositories/base/crud-repository.interface';

export abstract class CrudControllerBase<T extends Identifiable<ID>, ID> {

	constructor( private repository: CrudRepository<T, ID> ) {
	}

	@Get( '/:id' )
	@Summary( 'Get entity by id' )
	@Returns( 404, { description: 'Entity does not exists' } )
	async getById( @PathParams( 'id' ) @Description( 'identifier of entity to retrieve' ) id: ID ): Promise<T> {
		const found = await this.repository.getById( id );
		if ( !found ) {
			throw new NotFound( 'Entity does not exists' );
		}
		return found;
	}

	@Get( '/' )
	@Summary( 'Get all entities' )
	async getAll( @QueryParams( 'page' ) page?: number, @QueryParams( 'size' ) size?: number ): Promise<T[]> {
		return this.repository.getAll( Pageable.of( page, size ) );
	}

	@Post( '/' )
	@Summary( 'Create new entity' )
	async create( @BodyParams() @Description( 'new entity to create' ) newEntity: T ): Promise<T> {
		// force to override id to avoid accidental update
		newEntity.id = undefined;
		return this.repository.save( newEntity );
	}

	@Put( '/:id' )
	@Summary( 'Update existing entity' )
	@Returns( 400, {
		description:
			`Request body missing.
			Identifier of existing entity missing from url.`
	} )
	@Returns( 409, { description: 'Identifier in url ({ existingId }) not match with identifier in body ({ entityToUpdate.id }).' } )
	async update( @PathParams( 'id' ) @Description( 'identifier of existing entity' ) existingId: ID,
				  @BodyParams() @Description( 'modified entity to update' ) entityToUpdate: T ): Promise<T> {
		if ( !entityToUpdate ) {
			throw new BadRequest( 'Request body missing.' );
		} else if ( !existingId ) {
			throw new BadRequest( 'Identifier of existing entity missing from url.' );
		} else if ( entityToUpdate.id !== existingId ) {
			throw new Conflict(
				`Identifier in url (${ existingId }) not match with identifier in body (${ entityToUpdate.id }).`
			);
		} else {
			const found = await this.getById( existingId );
			if ( !found ) {
				throw new NotFound( 'Entity to update does not exists.' );
			}
			return this.repository.save( entityToUpdate );
		}
	}

	@Delete( '/:id' )
	@Summary( 'Delete an existing entity' )
	@Returns( 404, { description: 'Entity does not exists' } )
	@Status( 204 )
	async remove( @PathParams( 'id' ) @Description( 'identifier of entity to remove' )  id: ID ) {
		const found = await this.getById( id );
		if ( !found ) {
			throw new NotFound( 'Entity does not exists' );
		}
		return this.repository.remove( id );
	}
}
