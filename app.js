const express =  require('express')
const {graphqlHTTP} = require('express-graphql');
const {root, schema} = require('./schema');
const betterSchema = require('./schema/betterSchema')
const app= express();

app.use('/graphql',
  graphqlHTTP({
    schema:betterSchema,
    graphiql:true
  })
)

app.listen(4500, ()=>console.log(`live at http://localhost:4500`))