import React, {Component} from 'react';

import PasswordStrength from './password_strength';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const {Control, Group, Label} = Form;

export default class RegisterPage extends Component {
  state = {
    email: '',
    password: '',
    password_confirm: '',
    address: '',
  }

  onChange = key => ({target}) => this.setState({[key]: target.value});

  render() {
    const {email, password, password_confirm, address} = this.state;
    return <Container>
      <h1>Registration</h1>
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
          <Control type='password' value={password_confirm} onChange={this.onChange('password_confirm')} />
        </Group>
        <Group>
          <Label>Shipping Address:</Label>
          <Control as='textarea' value={address} onChange={this.onChange('textarea')} />
        </Group>
        <Button type='submit' variant='primary'>Register</Button>
      </Form>

      </Container>;
  }
}
