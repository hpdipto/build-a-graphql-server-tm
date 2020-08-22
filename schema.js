const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNoneNull
} = require('graphql');

// Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
});


// Hardcoded data
const customers = [
    {id: '1', name: 'John Doe', email: 'jdoe@gmail', age: 35},
    {id: '2', name: 'Steve Smith', email: 'steve@gmail', age: 25},
    {id: '3', name: 'Sarah Williams', email: 'sarah@gmail', age: 32}
];


// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                for(let i = 0; i < customers.length; i++) {
                    if(customers[i].id == args.id) {
                        return customers[i];
                    }
                }
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return customers;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});