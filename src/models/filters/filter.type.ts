export enum FilterMatchType {
	equals = 'equals',
	contains = 'contains'
}

export interface FilterElement {
	value: string;
	matchType: FilterMatchType;
}

export type FilterBase<T extends string> = {
	[ K in T ]: FilterElement
}
