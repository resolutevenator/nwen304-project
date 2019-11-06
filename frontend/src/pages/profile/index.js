import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import History from './history';

const {Control, Group, Label} = Form;
function profilePage(props) {
  if (!props.authtoken)
    return <Redirect to={'/login'} />;
  return (<Container>
    Hello {JSON.stringify(props)}
    <History token={props.authtoken}/>
  </Container>);
}

const mapStateToProps = ({user}) => user;
export default connect(mapStateToProps)(profilePage);
