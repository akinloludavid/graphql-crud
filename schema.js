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
    addNewCourse(title:String!, author:String!, description:String!, topic:String!):[Course]
    deleteCourse(id:Int!):[Course]
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

const addNewCourse =({title, author, description, topic})=>{
  let args = {}
   args.title = title
   args.author = author 
   args.topic = topic
   args.description = description 
  args.id = coursesData.length+1;
  coursesData.push(args)
  return coursesData
}

const updateCourse = ({id, topic})=>{
  coursesData.map(course =>{
    if(course.id ===id){
      course.topic =topic 
      return course
    }
  })
  
  return coursesData.filter(course =>course.id === id)[0]
}


const deleteCourse = ({id})=>{
  const course = coursesData.filter(c=>c.id===id)[0]
  let idx = coursesData.indexOf(course)
  coursesData.splice(idx,1)
  return coursesData

}
const root = {
  course:getCourse,
  courses:getCourses,
  authors:getAuthors,
  updateCourse:updateCourse,
  addNewCourse:addNewCourse,
  deleteCourse:deleteCourse,
  allCourses: coursesData

}

module.exports = {root, schema};