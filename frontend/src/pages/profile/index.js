import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Container from 'react-bootstrap/Container';

import History from './history';
import EditProfile from './edit_details';


function profilePage(props) {
  if (!props.authtoken)
    return <Redirect to={'/login'} />;

  return (<Container>
    Hello {JSON.stringify(props)}
    <EditProfile email={props.profile.email} address={props.profile.address} />
    <h1>Shipments</h1>
    <History token={props.authtoken}/>
  </Container>);
}

const mapStateToProps = ({user}) => user;
export default connect(mapStateToProps)(profilePage);
