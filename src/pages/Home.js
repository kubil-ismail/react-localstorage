import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

export default class Home extends Component {
  render() {
    return (
      <>
        <header className="masthead">
          <Container className="h-100">
            <Row className="h-100 align-items-center">
              <Col className="text-center">
                <h1 className="font-weight-light">Welcome to React Localstorage</h1>
                <p className="lead">A great starter layout for a landing page</p>
              </Col>
            </Row>
          </Container>
        </header>
      </>
    )
  }
}
