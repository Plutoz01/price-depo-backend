import { FilterBase } from './filter.type';

export type ShopFilterType
	= "name"
	| "address.country"
	| "address.postCode";

export type ShopFilter = FilterBase<ShopFilterType>;
