import React, {Component} from 'react';
import {connect} from 'react-redux';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

class HomePage extends Component {

  render() {

    return <>
      <Jumbotron>
        <Container>
        <h1> Hello and Welcome to Group 19 Book Services! </h1>
        </Container>
      </Jumbotron>
    </>;

  }
}

export default connect(a=>a)(HomePage);
