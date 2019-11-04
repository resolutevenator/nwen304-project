import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {GoogleLoginButton} from 'react-social-login-buttons';

function loginPage(props) {
  console.log(props.user);
  if (props.user.authtoken) 
    return '';

  return <Container>
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <h3>Sign In</h3>

            <GoogleLoginButton onClick={console.log}/>

            <Form>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type='email' placeholder='example@example.com' />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type='password' placeholder='password' />
              </Form.Group>
              <Button type='submit' variant='primary'>Login</Button>
            </Form>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Body>
            <Link to='/register'>
              <Button>
                Register
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
}

    export default connect(({user}) => ({user}))(loginPage);
