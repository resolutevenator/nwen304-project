import React, {Component} from 'react';


import {ROOT_URL} from '../../redux/actions/remote';

function getRecommendation(id) {
  return fetch(`${ROOT_URL}/recommend`)
    .then(x => x.json())
}


class Recommendation extends Component {
  state = {
    loading: true,
  }

  componentDidMount() {
    getRecommendation(this.props.id)
      .then(x => this.setState({
        loading: false,
        recommendations: x
        })
      );
  }

  render() {
    if (this.state.loading)
      return 'LOADING';

    return <div>{JSON.stringify(this.state)}</div>;
  }
}

export default Recommendation;
