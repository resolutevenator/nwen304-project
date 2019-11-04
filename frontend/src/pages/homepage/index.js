import React, {Component} from 'react';
import {connect} from 'react-redux';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';

class HomePage extends Component {

  render() {

    return <>
      <Jumbotron>
        <Container>
        <h1> Hello and Welcome to Shit Book Shop </h1>
          <p>{JSON.stringify(this.props)}</p>
        </Container>
      </Jumbotron>
    </>;

  }
}

export default connect(a=>a)(HomePage);
