import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUser} from '../../redux/actions';
import {Redirect} from 'react-router-dom';

import Spinner from '../../components/spinner';


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


const mapStateToProps = ({user}) => user;
const dispatchToProps = d => bindActionCreators({getUser}, d);
export default connect(mapStateToProps, dispatchToProps)(OauthHandler);
