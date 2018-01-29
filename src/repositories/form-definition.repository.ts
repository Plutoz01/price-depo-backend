import { Service } from 'ts-express-decorators';
import * as uuidv4 from 'uuid/v4';

import { initialFormDefinitions } from '../data/form-definition.data';
import { DynamicFormDef } from '../models/entitites/form-definitions.class';
import { InMemoryRepositoryBase } from './base/in-memory-base.repository';

@Service()
export class FormDefinitionRepository extends InMemoryRepositoryBase<DynamicFormDef, string> {

	initializeData() {
		initialFormDefinitions
			.filter( ( item ) => !!item.id )
			.forEach( item => this.items.set( <string>item.id, item ) );
	}

	protected generateNewIdFor(): string {
		return uuidv4();
	}
}