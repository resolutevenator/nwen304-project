import React, {Component} from 'react';
import {passwordReset} from '../../redux/actions';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const {Control, Group, Label} = Form;

function Submitted(props) {
  return <Container>
    <h1>Submitted Password Reset Request</h1>
    <p>If it is a valid account, you should receive an email shortly</p>
  </Container>
}

class PasswordResetPage extends Component {
  state = {
    email: '',
    submitted: false
  }

  submit = () => {
    if (this.state.submitted)
      return;
    this.setState({submitted: true})
    passwordReset(this.state.email)
    //do reset req
  }

  render() {
    if (this.state.submitted)
      return <Submitted />;
    return <Container>
      <h1> Reset Password </h1>
      <Group>
        <Label>Email to reset</Label>
        <Control type='email' value={this.state.email} placeholder='email@example.com'
          onChange={({target}) => this.setState({email: target.value})} />
      </Group>
      <Button onClick={this.submit}>Submit</Button>
    </Container>
  }
}

export default PasswordResetPage;
