import {
  ApolloClient,
  gql,
  createNetworkInterface
} from 'react-apollo'

const API = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: '/graphql',
    opts: {
      credentials: 'same-origin'
    }
  })
})

//  Function to check user Authentication, returns Promise which will resolve to a Boolean depending on login. 
//   NEEDS TO BE `async await`
const isAuthenticated = async function () {
  const res = await API.query({
    query: gql`{
      me {
        _id
      }
    }`
  })

  return res.data.me
    ? true
    : false
}

//  Function which fetches basic user information, as well as the UserSettings Object for rendering pages/fetching data
const getMyInfo = (objOpts) => {
  return API.query({
    query: gql`{
      me {
        _id
        displayName
        email
        githubLogin
        githubProfileURL
        profilePictureURL
        githubBio
        userSettings {
          showCodewars
          showcCodeSchool
          showTreehouse
        }
      }
    }`
  })
}

const getMyProjects = () => {
  return API.query({
    query: gql`{
      me{
        _id
        projectsConnection{
          connectionInfo{
            totalProjects
          }
          projects{
            _id
            name
            description
          }
        }
      }
    }`
  })
}

const getProjectInfo = (objObts) => {
  return API.query({
    query: gql`{
      me {
        _id
        projectsConnection {
        connectionInfo {
          totalProjects
        }
        projects {
          _id
          name
          description
          createdDate
        }
      }
    }
  }`
  })
}

const getTasks = (objObts) => {
  return API.query({
    query: gql`{
      tasks {
        description
        status
        assignedTo
        dueDate
        link
      }
    }`
  })
}

//  Function which takes in a User's Settings Object
// (stored in state on client-side) and returns thee correct info
// to Populate the User Profile.
const getFullProfileInfo = (objUserSettings) => {
  return API.query({
    query: gql`{
      me {
        
        ${useLocalBio ? 'localBio' : 'githubBio'}
        UserSettings{
          ${showCodewars ? 'codeWarsUsername' : ''}
          ${showcCodeSchool ? 'codeSchoolUsername' : ''}   
          ${showTreehouse ? 'treehouseUsername' : ''}   
        } 
      }
    }`
  })
}

// Get all projects function

const GetAllProjects = (objProject) => {
  return API.query({
    query: gql`{
      projects {
        _id
        name
        description
        createdDate
        owner {
          _id
        }
        collaborators {
          _id
        }
      }
    }`
  })
}

// Get all users function

const GetAllUsers = (objUser) => {
  return API.query({
    query: gql`{
      users {
        _id
        displayName
        email
        profilePictureURL
      }
    }`
  })
}

const projectCreate = ({name, description}) => {
  return API.mutate({
    mutation: gql`mutation projectCreate($data: projectInput!) {
      projectCreate (data: $data) {
        _id
        name
        description
      }
    }`,
    variables: {
      data: {
        name,
        description
      }
    }
  })
}

const searchProjectById = (id) => {
  return API.query({
    query: gql`query searchProjectById($id: String!) {
      projects(_id: $id) {
        name
        description
        createdDate
      }
    }`,
    variables: {
      id: id
    }
  })
}

const searchbyName = (term) => {
  return API.query({
    query: gql`query searchbyName($term: String!) {
      users(displayName: $term) {
        _id
        displayName
        githubLogin
        profilePictureURL
      }
      projects(name: $term) {
        _id
        name
        description
        owner {
          displayName
        }
      }
    }`,
    variables: {
      term: term
    }
  })
}


const getHomeInfo = () => {
  API.query({
    query: gql`{
      me {
        _id
        displayName
        email
        profilePictureURL
        githubBio
        userSettings {
          useLocalBio
          showCodewars
          showcCodeSchool
          showTreehouse
        }
      }
      users {
        _id
        displayName
        profilePictureURL
      }
      projects {
        _id
        name
        description
      }
    }`})
}

module.exports = {
  API,
  isAuthenticated,
  getMyInfo,
  getMyProjects,
  getFullProfileInfo,
  projectCreate,
  getProjectInfo,
  GetAllProjects,
  GetAllUsers,
  searchbyName,
  searchProjectById,
  getHomeInfo,
  getTasks
}
