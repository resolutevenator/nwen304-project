import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import Edit from './edit';
import Archive from './archive';

import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'


const modes = ['EDIT ORDERS', 'ARCHIVE ORDERS'];

class AdminPage extends Component {

  state = {
    mode: modes[0]
  }

  render() {
    const {profile, authtoken} = this.props.user;
    if (profile.usertype !== 'admin')
      return <Redirect to='/' />;
    const {mode} = this.state;
    let View;
    switch(mode) {
      case modes[0]:
        View = Edit;
        break;
      case modes[1]:
        View = Archive;
        break;
    }
    return <Container>
      {/*Select Admin View*/}
      <Nav variant='tabs' onSelect={x => this.setState({mode:x})} activeKey={mode}>
        {modes.map(x => <Nav.Item key={x}>
          <Nav.Link eventKey={x}>
            {x}
          </Nav.Link>
        </Nav.Item>)}
      </Nav>
      <View token={authtoken}/>
    </Container>
  }
};


const mapStateToProps = ({user}) => ({user});
export default connect(mapStateToProps)(AdminPage);
