const express = require('express');
const expressGraphQL = require('express-graphql');

const schema = require('./schema.js');


const app = express();

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphgiql: true
}))

app.listen(5000, () => {
    console.log('Server is running on port 5000');
})