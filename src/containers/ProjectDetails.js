import React, {Component} from 'react'
// import {Link} from 'react-router-dom'
import MainNav from '../components/MainNav'
import Footer from '../components/Footer'

// Project details page to display the full description of a project as well as show tasks and comments
// Data needed will be the specific project that was clicked.
// Project Data will be (Title, Desc, Tech, Users)
// Other data includes task and comments

class ProjectDetails extends Component {
  constructor () {
    super()
    this.state = {
      projects: []
    }
  }
  render () {
    return (
      <div>
        <MainNav />
        <p>Find the project selected in the database and disply it here.</p>
        <Footer />
      </div>
    )
  }
}

export default ProjectDetails