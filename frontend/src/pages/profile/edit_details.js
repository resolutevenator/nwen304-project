import React, {Component} from 'react';
import {connect} from 'react-redux';
import PasswordStrength from '../register/password_strength';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
const {Control, Group, Label}  = Form;

class EditProfile extends Component {
  state = {
    address: this.props.address,
    password: '',
    password_confirm: ''
  }

  change = k => ({target}) => this.setState({[k]: target.value});

  render() {
    const {address, password, password_confirm} = this.state;

    return <>
      <h1>Edit Profile: {this.props.email}</h1>
      <Group>
        <Label>Address:</Label>
        <Control as='textarea' value={address} onChange={this.change('address')} />
      </Group>
      <Group>
        <Label>New Password:</Label>
        <Control type='password' value={password} onChange={this.change('password')} />
        <PasswordStrength password={password} />
      </Group>
      <Group>
        <Label>Confirm New Password:</Label>
        <Control type='password' value={password_confirm} onChange={this.change('password_confirm')} 
          isInvalid={password !== password_confirm} />
      </Group>
      <Button variant='primary'> Submit Changes </Button>
    </>

  }
    
}

export default connect()(EditProfile);
