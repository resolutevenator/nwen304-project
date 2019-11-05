import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUser} from '../../redux/actions';
import {Redirect} from 'react-router-dom';

import SpinnerRB from 'react-bootstrap/Spinner';

class OauthHandler extends Component {
  componentDidMount() {
    const code = this.props.match.params.code;
    console.log(code);

    this.props.getUser(code);

  }
  render() {
    if (!this.props.authtoken)
      return <Spinner />
    return <Redirect to={'/profile'} />;
  }
}

function Spinner() {
  return <SpinnerRB animation='border' variant='info' style={{width: '10rm', height: '10rm'}} />
}

const mapStateToProps = ({user}) => user;
const dispatchToProps = d => bindActionCreators({getUser}, d);
export default connect(mapStateToProps, dispatchToProps)(OauthHandler);
