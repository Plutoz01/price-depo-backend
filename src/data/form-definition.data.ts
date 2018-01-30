import { DynamicFormDef } from "../models/entitites/form-definitions.class";

export const initialFormDefinitions: DynamicFormDef[] = <DynamicFormDef[]>[
	{
		"id": "manufacturer-admin-form",
		"type": "group",
		"members": [
			{
				"type": "hidden",
				"key": "id"
			},
			{
				"type": "text",
				"key": "name",
				"label": "Name",
				"placeholder": "Enter manufacturer name",
				"required": true
			},
			{
				"type": "text",
				"key": "country",
				"label": "Country",
				"placeholder": "Enter country of manufacturer",
				"description": "Please add full name of country",
				"required": true
			}
		]
	},

	{
		"id": "chain-store-admin-form",
		"type": "group",
		"members": [
			{
				"type": "hidden",
				"key": "id"
			},
			{
				"type": "text",
				"key": "name",
				"label": "Name",
				"placeholder": "Enter chain store name",
				"required": true
			},
			{
				"type": "text",
				"key": "website",
				"label": "Website",
				"placeholder": "Enter website URL",
				"description": "Please use http:// or https:// prefixes",
				"required": true
			}
		]
	},

	{
		"id": "shop-admin-form",
		"type": "group",
		"members": [
			{
				"type": "hidden",
				"key": "id"
			},
			{
				"type": "text",
				"key": "name",
				"label": "Name",
				"placeholder": "Enter shop name",
				"required": true
			},
			{
				"type": "searchableDropdown",
				"key": "chainStoreId",
				"label": "Chain store",
				"placeholder": "Please select a chain store",
				"required": true,
				"displayKey": "name",
				"searchProviderName": "chainStoreSearchProvider"
			},
			{
				"type": "group",
				"key": "address",
				"members": [
					{
						"type": "text",
						"key": "country",
						"label": "Country",
						"placeholder": "Enter country",
						"required": true
					},
					{
						"type": "text",
						"key": "postCode",
						"label": "Post code",
						"placeholder": "Enter post code",
						"required": true
					},
					{
						"type": "text",
						"key": "settlement",
						"label": "Settlement",
						"placeholder": "Enter settlement",
						"required": true
					},
					{
						"type": "text",
						"key": "street",
						"label": "Street",
						"placeholder": "Enter street",
						"required": true
					},
					{
						"type": "text",
						"key": "number",
						"label": "House number",
						"placeholder": "Enter house number",
						"required": true
					}
				]
			}
		]
	},

	{
		"id": "product-admin-form",
		"type": "group",
		"members": [
			{
				"type": "hidden",
				"key": "id"
			},
			{
				"type": "text",
				"key": "name",
				"label": "Name",
				"placeholder": "Enter product name",
				"required": true
			},
			{
				"type": "searchableDropdown",
				"key": "manufacturerId",
				"label": "Manufacturer",
				"placeholder": "Please select amanufacturer",
				"required": false,
				"displayKey": "name",
				"searchProviderName": "manufacturerSearchProvider"
			},
			{
				"type": "text",
				"key": "barcode",
				"label": "Barcode",
				"placeholder": "Enter product barcode",
				"required": false
			},
		]
	}
];
