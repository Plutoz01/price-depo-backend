import { FilterBase } from './filter.type';

export type ShopFilterKeys
	= "name"
	| "address.country"
	| "address.postCode";
// TODO: add additional keys

export type ShopFilter = FilterBase<ShopFilterKeys>;
