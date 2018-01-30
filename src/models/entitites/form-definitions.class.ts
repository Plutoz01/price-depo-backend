import { JsonProperty, Required } from 'ts-express-decorators';
import { Identifiable } from '../identifiable.interface';


export enum DynamicFormElementType {
	group = 'group',
	hidden = 'hidden',
	text = 'text',
	searchableDropdown = 'searchableDropdown'
}

export interface AbstractDynamicFormElement {
	readonly type: DynamicFormElementType;
	readonly key: string;
	readonly label?: string;
}

// export interface DynamicFormControlDef extends AbstractDynamicFormElement {
// 	readonly description?: string;
// 	readonly placeholder?: string;
// 	readonly required?: boolean;
// }

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