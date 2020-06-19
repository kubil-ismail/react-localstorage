import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'
import store from 'store2'
import { Link } from 'react-router-dom'

import Home from './pages/Home'
import Profile from './pages/Profile'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'

export default class App extends Component {

  logout = () => {
    store.remove('login')
    this.props.history.push('/sign-in')
  }

  render() {
    return (
      <Router>
        <Navbar bg="light" expand="lg" className="shadow navbar-light">
          <Container>
            <Link to="/" className="navbar-brand">React-Localstorage</Link>
            <Navbar.Toggle aria-controls="navbarResponsive" />
            <Navbar.Collapse id="navbarResponsive">
              <Nav className="ml-auto">
                {store('login') ? (
                  <>
                    <Link to="/profile" className="nav-link">Profile</Link>
                    <Button className="nav-link text-white" size="sm" variant="danger" onClick={this.logout}>
                      Logout
                  </Button>
                  </>
                ) : (
                    <>
                      <Link to="/sign-in" className="nav-link">Sign In</Link>
                      <Link to="/sign-up" className="nav-link btn btn-primary btn-sm text-white">Sign Up</Link>
                    </>
                  )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/profile" component={Profile} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/sign-in" component={SignIn} />
        </Switch>
      </Router>
    )
  }
}
