import React, {Component} from 'react';
import {connect} from 'react-redux';
import {groupBy} from 'lodash';

import {getOrderHistory} from '../../redux/actions';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
const {Item} = ListGroup;

class OrderHistory extends Component {

  state = {
    orders: []
  };

  componentDidMount() {
    const {token} = this.props;
    getOrderHistory(token).then(p => this.setState({orders: p.purchases}));

  }

  render() {
    return this.state.orders.map(order => {
      const products = groupBy(order.productid, x => x)
      const p = Object.keys(products).map(k => ({...this.props.items[k], quantity: products[k].length}));
      return <>
      <h3>{new Date(+order.time).toString()}</h3>
      <h3>Shipped to</h3>
      <code>
        {order.address}
      </code>
      <h4>Status: {order.current_status}</h4>
      <ListGroup>
        {p.map(x=> <Item key={x.bookid}>
          <Row>
            <Col>
              <b>Title</b>: {x.title}
              <br />
              <b>Author</b>: {x.author}
            </Col>
            <Col>
              x {x.quantity}
            </Col>
          </Row>
        </Item>)}
      </ListGroup>
      <h3>Cost: {order.cost}</h3>
    </>});
  }
}

const mapStateToProps = ({items}) => ({items});
export default connect(mapStateToProps)(OrderHistory);
