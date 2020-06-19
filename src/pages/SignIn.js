import React, { Component } from 'react'
import {
  Container, Row, Col, Card, Form, Button, Alert
} from 'react-bootstrap'
import store from 'store2'

export default class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
      notMatch: false,
      login: true,
      error: null
    }
    if (store('login')) {
      this.props.history.push('/')
    }
  }

  onSubmit = (e) => {
    e.preventDefault()

    const { email, password } = this.state
    store('login', true)
    if (email === store('email') && password === store('password')) {
      this.props.history.push('/')
    } else {
      this.setState({
        notMatch: true,
        error: 'Account not found'
      })
    }
  }

  render() {
    const { notMatch, error } = this.state
    return (
      <>
        <div className="masthead py-5">
          <Container>
            <Row>
              <Col lg={5} className="mx-auto">
                <Card className="card-signin flex-row my-5">
                  <Card.Body>
                    <h5 className="card-title text-center">Sign In</h5>
                    {notMatch ? <Alert variant="danger">{error}</Alert> : null}
                    <Form className="form-signin" onSubmit={this.onSubmit}>
                      <Form.Group className="form-label-group " controlId="inputEmail">
                        <Form.Control
                          type="email"
                          placeholder="Email address"
                          onChange={(e) => this.setState({ email: e.target.value })}
                          required
                        />
                        <Form.Label>Email address</Form.Label>
                      </Form.Group>
                      <Form.Group className="form-label-group mb-5" controlId="inputPassword">
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          onChange={(e) => this.setState({ password: e.target.value })}
                        />
                        <Form.Label>Password</Form.Label>
                      </Form.Group>
                      <Button className="text-uppercase" type="submit" size="lg" block>Sign In</Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    )
  }
}
