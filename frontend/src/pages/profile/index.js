import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

function profilePage(props) {
  if (false)
    return <Redirect to={'/login'} />;
  return (<div>
    Hello {JSON.stringify(props)}
  </div>);
}

export default connect()(profilePage);
