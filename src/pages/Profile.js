/* eslint-disable no-useless-escape */
import React, { Component } from 'react'
import {
  Container, Row, Col, Card, Form, Button, Alert
} from 'react-bootstrap'
import store from 'store2'

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      email: null,
      password: null,
      password2: null,
      notMatch: false,
      error: null
    }
    if (!store('login')) {
      this.props.history.push('/')
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { email, password, password2 } = this.state
    const rgx = new RegExp("^(?=.*?[a-z])(?=.*[@$!%*#?&])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$")
    const test = rgx.test(password)
    if (password !== password2) {
      this.setState({
        notMatch: true,
        error: 'Password not match'
      })
    } else {
      if (email === store('email')) {
        this.setState({
          notMatch: true,
          error: 'Email already register'
        })
      } else {
        if (test) {
          store(this.state)
          this.props.history.push('/')
        } else {
          this.setState({
            notMatch: true,
            error: 'Password Minimum eight characters, at least one letter, one number and one special character'
          })
        }
      }
    }
  }

  render() {
    const { notMatch, error } = this.state
    return (
      <div className="masthead py-5">
        <Container className="h-100">
          <Row className="h-100 align-items-center">
            <Col lg={5} className="mx-auto">
              <h1 className="text-center font-weight-light">Welcome {store('username')}</h1>
              <p className="text-center lead">{store('email')}</p>
              <Card className="card-signin flex-row my-5">
                <Card.Body>
                  <h5 className="card-title text-center">Sign Up</h5>
                  {notMatch ? <Alert variant="danger">{error}</Alert> : null}
                  <Form className="form-signin" onSubmit={this.onSubmit}>
                    <Form.Group className="form-label-group" controlId="inputUserame">
                      <Form.Control
                        type="text"
                        placeholder="Username"
                        onChange={(e) => this.setState({ username: e.target.value })}
                        required
                        autoFocus
                      />
                      <Form.Label>Username</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-label-group " controlId="inputEmail">
                      <Form.Control
                        type="email"
                        placeholder="Email address"
                        onChange={(e) => this.setState({ email: e.target.value })}
                        required
                      />
                      <Form.Label>Email address</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-label-group " controlId="inputPassword">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => this.setState({ password: e.target.value })}
                      />
                      <Form.Label>Password</Form.Label>
                    </Form.Group>
                    <Form.Group className="form-label-group " controlId="inputPassword2">
                      <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        onChange={(e) => this.setState({ password2: e.target.value })}
                        required
                      />
                      <Form.Label>Confirm password</Form.Label>
                    </Form.Group>
                    <Button className="text-uppercase" type="submit" size="lg" block>Edit Profile</Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}
