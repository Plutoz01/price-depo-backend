import { BodyParams, Delete, Get, PathParams, Post, Put, QueryParams, Status } from 'ts-express-decorators';
import { Description, Returns, Summary } from 'ts-express-decorators/lib/swagger';
import { BadRequest, Conflict, NotFound } from 'ts-httpexceptions';
import { Identifiable } from '../../models/identifiable.interface';
import { PageResponse } from '../../models/page-response.class';
import { Pageable } from '../../models/pageable.class';
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
	async getAll( @QueryParams( 'page' ) @Description( 'page number ( optional, default is 0 )' ) page?: number,
				  @QueryParams( 'size' ) @Description( `page size ( optional, default is ${ Pageable.defaultPageSize } )` ) size?: number ): Promise<PageResponse<T>> {
		const pageable = Pageable.of( page, size );
		const [ items, total ]: [ T[], number ] = await Promise.all( [
			this.repository.getAll( pageable ),
			this.repository.count()
		] );
		return PageResponse.of( items, pageable, total );
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
