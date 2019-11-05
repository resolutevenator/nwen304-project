import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {login} from '../../redux/actions/remote';

import Container from 'react-bootstrap/Container';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import {GoogleLoginButton} from 'react-social-login-buttons';

class loginPage extends Component {
  state = { 
    email: '',
    password: ''
  }
  update = field => ({target}) => this.setState({[field]: target.value});

  render() {
    const {user, login} = this.props;
    const {email, password} = this.state;
    if (user.authtoken) 
      return <Redirect to={'/profile'} />;

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
                  <Form.Control type='email' placeholder='example@example.com' value={email} onChange={this.update('email')}/>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type='password' placeholder='password' value={password} onChange={this.update('password')}/>
                </Form.Group>
                <Button variant='primary'
                  onClick={()=>login(email, password)}>Login</Button>
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
}

const dispatchToProps = dispatch => bindActionCreators({login}, dispatch);
export default connect(({user}) => ({user}), dispatchToProps)(loginPage);
