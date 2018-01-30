import { JsonProperty, Required } from 'ts-express-decorators';
import { Identifiable } from '../identifiable.interface';


export enum DynamicFormElementType {
	group = 'group',
	hidden = 'hidden',
	text = 'text',
	searchableDropdown = 'searchableDropdown',
	predefinedMultiSelect = 'predefinedMultiSelect'
}

export interface AbstractDynamicFormElement {
	readonly type: DynamicFormElementType;
	readonly key: string;
	readonly label?: string;
}

export interface DynamicFormGroupDef extends AbstractDynamicFormElement {
	readonly members: AbstractDynamicFormElement[];
}

export class DynamicFormDef implements Identifiable<string>, DynamicFormGroupDef {
	@JsonProperty()
	id?: string;

	@Required()
	type: DynamicFormElementType;

	@Required()
	key: string;

	@JsonProperty()
	label: string;

	@Required()
	readonly members: AbstractDynamicFormElement[];
}