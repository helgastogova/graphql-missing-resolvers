import {makeExecutableSchema} from "@graphql-tools/schema";
import {
	GraphQLObjectType,
	GraphQLSchema,
	isObjectType,
	getNamedType,
} from "graphql";

export function checkMissingResolvers(schema: GraphQLSchema, checkNested: boolean = false) {
	const queryType = schema.getQueryType();
	const mutationType = schema.getMutationType();
	const subscriptionType = schema.getSubscriptionType();

	[queryType, mutationType, subscriptionType].forEach((type) => {
		if (type) {
			checkMissingResolversRecursively(type, "", checkNested);
		}
	});
}

function checkMissingResolversRecursively(
	type: GraphQLObjectType,
	path: string = "",
	checkNested: boolean = false
) {
	const fields = type.getFields();

	Object.keys(fields).forEach((fieldName) => {
		const field = fields[fieldName];
		const resolver = field.resolve;
		const newPath = path ? `${path}.${fieldName}` : fieldName;

		if (!resolver) {
			console.warn(`Missing resolver for field: ${newPath}`);
		}

		const fieldType = getNamedType(field.type);

		if (isObjectType(fieldType) && checkNested) {
			checkMissingResolversRecursively(fieldType, newPath, checkNested);
		}
	});
}
