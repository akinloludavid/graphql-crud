const {buildSchema} = require('graphql');

const schema = buildSchema(`
  type Query {
    allCourses:[Course]
    authors(author:String!):[Course]
    course(id:Int!):Course
    courses(topic:String):[Course]
  }
  type Mutation{
    updateCourse(id:Int!, topic:String!):Course
  }
  type Course {
    id:Int
    title:String 
    author:String 
    description:String
    topic:String
  }
`)

const coursesData = [
  {
    id:1,
    title:"Nodejs Intro",
    author:"Akin",
    topic:"APIS",
    description:"Creating APIs with Express"
  },
  {
    id: 2,
    title: "Nodejs Intermediate",
    author: "David",
    topic:"Security",
    description: "Securing Routes"
  }, 
  {
    id: 3,
    title: "Graphql Intro",
    author: "akinlolu",
    topic:"Backend",
    description: "Querying data with Graphql"
  }
]
const getCourse = ({id})=>{
  return coursesData.filter(course => {
    return course.id ===id 
  })[0];
}

const getCourses = ({topic})=>{
  return coursesData.filter(course=>course.topic === topic)
}

const getAuthors = ({author})=>{
  return coursesData.filter(course=> course.author === author)
}

const updateCourse = ({id, topic})=>{
  coursesData.map(course =>{
    if(course.id ===id){
      course.topic ===topic 
      return course
    }
  })
}

const root = {
  course:getCourse,
  courses:getCourses,
  authors:getAuthors,
  update:updateCourse,
  allCourses: coursesData

}

module.exports = {root, schema};