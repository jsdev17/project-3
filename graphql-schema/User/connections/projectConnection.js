const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'projectConnection',
  description: 'Connection between User and their Projects.  Returns edge data and a list of Current Projects (owner and collborator)',
  fields: () => ({

 //   Information about the User-Projects Connection (i.e. Total Projects, owned Projects)
      connectionInfo: {
        type: new GraphQLObjectType({
          name: 'projectsConnectionInfo',
          fields: () => ({

            totalProjects: {
              type: GraphQLInt,
              resolve: arrProjects => arrProjects.length 
            },
//          TODO: Correct Resolver to correctly filter whether query was me/users 
            ownedProjects: {
              type: GraphQLInt,
              resolve: (arrProjects, args, req) => {
//              If there is an _id argument present, return that users projects, 
//              otherwise it return the logged in user's projects.
                return args._id 
                  ? arrProjects.filter(p => p.owner === args._id).length
                  : arrProjects.filter(p => p.owner === req.user._id).length
              }
            }
          })
        }),
        resolve: arrProjects => arrProjects
      },
//    The array of Project Objects, uses an Inline Require to import the ProjectType.
      projects: {
        type: new GraphQLList(require('../../Project/projectType.js')),
        resolve: arrProjects => arrProjects
      }
    })
})
