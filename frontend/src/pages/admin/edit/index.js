import React, {Component} from 'react';
import {getAllOrders} from '../../../redux/actions/remote';

import Order from './order';

class EditOrders extends Component {
  state = {
    allOrders: []
  }

  rm = ({email, time}) => {
    let {allOrders} = this.state;
    allOrders = [...allOrders];
    const idx = allOrders.findIndex(o => o.email === email && o.time === time);
    if (idx === -1)
      return;
    allOrders.splice(idx,1);
    this.setState({allOrders});
  }

  componentDidMount() {
    const {token} = this.props;
    getAllOrders(token)
      .then(allOrders => this.setState({allOrders}))
  }

  render() {
    const {allOrders} = this.state;
    return allOrders.map(x => <Order
      {...x}
      key={`${x.email}${x.time}`}
      rm={this.rm}
      token={this.props.token}
      />);
  }

}



export default EditOrders;
