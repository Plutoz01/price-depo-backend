import { Identifiable } from './identifiable.interface';
import { Pageable } from './pageable.class';

export class PageResponse<T extends Identifiable<any>> {

	static of<T extends Identifiable<any>>( content: T[], pageable: Pageable, totalItems: number ): PageResponse<T> {
		const totalPages = Math.ceil( totalItems / pageable.size );

		return new PageResponse<T>(
			content,
			pageable.page,
			pageable.size,
			pageable.page < ( totalPages - 1 ),
			pageable.page > 0,
			totalPages,
			totalItems
		);
	}

	private constructor( public readonly content: T[],
						 public readonly pageNumber: number,
						 public readonly pageSize: number,
						 public readonly hasNextPage: boolean,
						 public readonly hasPreviousPage: boolean,
						 public readonly totalPages: number,
						 public readonly totalItems: number ) {
	}
}