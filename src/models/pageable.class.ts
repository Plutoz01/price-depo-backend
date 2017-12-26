export class Pageable {
	static readonly defaultPageSize = 20;

	static of( page = 0, size = Pageable.defaultPageSize ): Pageable {
		page = page < 0 ? 0 : page;
		size = size < 1 ? Pageable.defaultPageSize : size;
		return new Pageable( page, size );
	}

	private constructor( public readonly page = 0, public readonly size = Pageable.defaultPageSize ){
	}

	get firstIndex(): number {
		return this.page * this.size;
	}

	get lastIndex(): number {
		return this.firstIndex + this.size;
	}
}