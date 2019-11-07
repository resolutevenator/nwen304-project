import React, {Component} from 'react';
import {getRecommendation} from '../../redux/actions/remote';
import ItemView from '../../components/item_list';



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

    return <ItemView items={this.state.recommendations.map(x=>x.bookid)} />;
  }
}

export default Recommendation;
