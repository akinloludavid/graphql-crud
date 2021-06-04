const graphql = require("graphql");

const {
 GraphQLObjectType,
 GraphQLString,
 GraphQLSchema,
 GraphQLID,
 GraphQLInt,
 GraphQLList,
 GraphQLNonNull,
} = graphql;

const movies = [
 {
  id: 1,
  title: "Seeker",
  genre: "Adventure",
  producer: "Tolulope",

 },
 {
   id: 2,
   title: "Merlin",
   genre: "Magic",
   producer: "Akinlolu",

 }, 
 {
   id: 3,
   title: "Heroes",
   genre: "SciFi",
   producer: "Gabe",

 },
  {
    id: 1,
    title: "pOWER",
    genre: "cARTEL",
    producer: "Tolulope",

  }, {
    id: 2,
    title: "rED",
    genre: "Magic",
    producer: "Akinlolu",

  }, {
    id: 3,
    title: "kINGDOM",
    genre: "SciFi",
    producer: "Gabe",

  },
];

const actors = [
  {
    actorId:1,
    name:"LUCAS MODRIC",
    age:32
  },
  {
    actorId: 2,
    name: "lukaku",
    age: 27
  },
  {
    actorId: 3,
    name: "Leonardo",
    age: 23
  }
]
const MovieType = new GraphQLObjectType({
  name: "Movies",
  fields: () => ({
  id: { type: GraphQLID },
  title: { type: GraphQLString },
  genre: { type: GraphQLString },
  producer: { type: GraphQLString },
  mainActor: {
  type: ActorType,

  resolve(parent, args) {
    return actors.filter((actor) => actor.actorId == parent.id)[0];
  },
  },
}),
});

const ActorType = new GraphQLObjectType({
 name: "Actor",
 fields: () => ({
  actorId: { type: GraphQLID },
  name: {
   type: GraphQLString,
  },
  age: { type: GraphQLInt },
  movies: {
   type: new GraphQLList(MovieType),

   resolve(parent, args) {
    return movies.filter(movie => movie.id == parent.actorId);
   },
  },
 }),
});


const Mutation = new GraphQLObjectType({
  name:"Mutation",
  fields:{
    addActor:{
      type:ActorType,
      args:{
        name:{type: new GraphQLNonNull(GraphQLString)},
        age:{type:new GraphQLNonNull(GraphQLInt)}
      }, 
      resolve(parent,args){
        args.actorId = actors.length +1
        actors.push(args)
        return args
      }
    },
    addMovies:{
      type:MovieType,
      args:{
        title:{type: new GraphQLNonNull(GraphQLString)},
        genre:{type:new GraphQLNonNull(GraphQLString)}
      },
      resolve(parent,args){
        args.id = movies.length+1
        movies.push(args)
        return args
      }
    }, 
    removeMovies:{
      type:MovieType,
      args:{
        id: {type: GraphQLID}
      }, 
      resolve(parent, {id}){
        return movies.filter(movie => movie.id !== id)
      }
    }, 
    updateMovie:{
      type:MovieType, 
      args:{
        id:{type:GraphQLID},
        title:{type:new GraphQLNonNull(GraphQLString)}
      },
      resolve(parent,{id, title}){
        movies.map(m =>{
          if(m.id ===id){
            m.title= title
            return m
          }
        })
        return movies.filter(m => m.id ==id)[0]
      }

    }
  }
})
const RootQuery = new GraphQLObjectType({
  name:'RootQuery',
  fields:{
    movie:{

      type:MovieType,
      args:{
        id:{type:GraphQLID}
      }, 
      resolve(parent, args){
        return movies.filter(movie =>movie.id == args.id)
      }
    },
    movies:{
      type:new GraphQLList(MovieType),
      resolve(parent, args){
        return movies
      }
    },
    actor:{
      type: ActorType,
      args:{
        id:{type:GraphQLID}
      },
      resolve(parent, {id}){
        return actors.filter(actor => actor.actorId ==id)[0]
      }
    },
    actors: {
      type: new GraphQLList(ActorType),
      resolve(parent, args) {
        return actors
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query:RootQuery,
  mutation:Mutation
})