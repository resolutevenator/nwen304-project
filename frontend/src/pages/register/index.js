import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {registerUser} from '../../redux/actions';

import PasswordStrength from './password_strength';
import zxcvbn from 'zxcvbn';

import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Spinner from '../../components/spinner';
import SocialLogin from '../../components/social-login';


const {Control, Group, Label} = Form;

export default class RegisterPage extends Component {
  state = {
    email: '',
    password: '',
    password_confirm: '',
    address: '',
    error: '',
    submitted: false,
    done: false
  };

  onChange = key => ({target}) => this.setState({[key]: target.value});

  onSubmit = () => {
    const {email, password, password_confirm, address} = this.state;
    const emailCheck = 
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailCheck.test(email)){
      this.setState({error: 'Invalid Email'});
      return;
    }
    if (password !== password_confirm) {
      this.setState({error: 'Passwords Do Not Match'});
      return;
    }
    if (zxcvbn(password).score < 2) {
      this.setState({error: 'Password must be more complex'});
      return;
    }
    if (address === '') {
      this.setState({error: 'Must have an address'});
      return;
    }
    this.setState({submitted: true})
    registerUser(email, password, address)
    //TODO: Error
    .then(() => this.setState({done: true}));
  };

  render() {
    const {email, password, password_confirm, address, error, submitted, done} = this.state;

    if (done)
      return <Redirect to='/login' />
    if (submitted)
      return <div
        style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.5em'
        }}
      >
        <Spinner />
      </div>;
    return <Container>
      <h1>Registration</h1>
      <SocialLogin />
      <Form>
        <Group>
          <Label>Email:</Label>
          <Control type='text' value={email} onChange={this.onChange('email')} />
        </Group>
        <Group>
          <Label>Password:</Label>
          <Control type='password' value={password} onChange={this.onChange('password')} />
          <PasswordStrength password={password} />
        </Group>
        <Group>
          <Label>Password Confirmation:</Label>
          <Control type='password' value={password_confirm} onChange={this.onChange('password_confirm')}
            isInvalid={this.state.password !== this.state.password_confirm} />
        </Group>
        <Group>
          <Label>Shipping Address:</Label>
          <Control as='textarea' value={address} onChange={this.onChange('address')} />
        </Group>
        {error ? <Alert variant='danger'>{error}</Alert> : ''}
        <Button variant='primary' onClick={this.onSubmit}>Register</Button>
      </Form>

      </Container>;
  }
}

