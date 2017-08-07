const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql')


module.exports = new GraphQLObjectType({
  name: 'projectConnection',
  description: 'Connection between User and their Projects.  Returns edge data and a list of Current Projects (owner and collborator)',
  fields: () => ({

 //   Information about the User-Projects Connection (i.e. Total Projects, owned Projects)
      connectionInfo: {
        type: new GraphQLObjectType({
          name: 'connectionInfo',
          fields: () => ({

            totalProjects: {
              type: GraphQLInt,
              resolve: (arrProjects) => arrProjects.length 
            },

            ownedProjects: {
              type: GraphQLInt,
              resolve: (arrProjects, args, req) => {
                return args._id 
                  ? arrProjects.filter(p => p.owner._id === args._id).length
                  : arrProjects.filter(p => p.owner._id === req.user._id).length
              }
            }

          })
        }),
        resolve: (arrProjects) => arrProjects
      },

//    The array of Project Objects
      projects: {
        type: new GraphQLList(require('../../Project/projectType.js')),
        resolve: (arrProjects) => arrProjects
      }
    })
})