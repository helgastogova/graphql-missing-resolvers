"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMissingResolvers = void 0;
const graphql_1 = require("graphql");
function checkMissingResolversRecursively(type, path = '') {
    const fields = type.getFields();
    Object.keys(fields).forEach((fieldName) => {
        const field = fields[fieldName];
        const resolver = field.resolve;
        const newPath = path ? `${path}.${fieldName}` : fieldName;
        if (!resolver) {
            console.warn(`Missing resolver for field: ${newPath}`);
        }
        const fieldType = (0, graphql_1.getNamedType)(field.type);
        if ((0, graphql_1.isObjectType)(fieldType)) {
            checkMissingResolversRecursively(fieldType, newPath);
        }
    });
}
function checkMissingResolvers(schema) {
    const queryType = schema.getQueryType();
    const mutationType = schema.getMutationType();
    const subscriptionType = schema.getSubscriptionType();
    [queryType, mutationType, subscriptionType].forEach((type) => {
        if (type) {
            checkMissingResolversRecursively(type);
        }
    });
}
exports.checkMissingResolvers = checkMissingResolvers;
