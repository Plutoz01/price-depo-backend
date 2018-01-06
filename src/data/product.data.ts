import * as _ from 'lodash';
import { Product } from '../models/entitites/product.class';
import { Identifiable } from '../models/identifiable.interface';
import { initialManufacturers } from './manufacturer.data';

const generatedData = 150;


export const initialProducts: Product[] = _.range( generatedData ).map(
	( generatedNumber: number ): Product => {
		return {
			id: `id_prod_${ generatedNumber }`,
			name: `prod_${ generatedNumber }`,
			barcode: _.random( 1000 * 1000, 10 * 1000 * 1000 - 1 ).toString(),
			manufacturerId: selectRandomManufacturerId()
		}
	} );

function selectRandomManufacturerId(): string {
	const source: Identifiable<any>[] = initialManufacturers;
	const rndIndex = _.random( source.length - 1 );
	return <string>source[ rndIndex ].id;
}
