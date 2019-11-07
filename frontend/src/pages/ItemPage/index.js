import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Error from '../../components/error';
import {addItem, modifyItem, removeItem} from '../../redux/actions';

import Recommendation from './recommendation';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class ItemPage extends Component {
  constructor(props) {
    super(props);
    this.state = {count: props.quantity};
  }

  bindCount = c => Math.min(this.props.item.stock, Math.max(0, c));

  incrementCount = () => this.setState(({count}) => ({count: this.bindCount(count+1)}));
  decrementCount = () => this.setState(({count}) => ({count: this.bindCount(count-1)}));

  changeCart = () => {
    let {count} = this.state;
    let {inCart, id} = this.props;
    if (inCart && count === 0)
      this.props.removeItem(id)
    if (inCart)
      this.props.modifyItem(id, count);
    if (count > 0)
      this.props.addItem(id, count);
  }

  render() {
    const {inCart, item, location} = this.props;
    const {count} = this.state;
    let buttonVariant = 'primary';
    let buttonText = 'Add To Cart';
    if (!inCart) {
    } else if (count === 0) {
      buttonVariant = 'warning';
      buttonText = 'Remove from Cart';
    } else {
      buttonVariant = 'info';
      buttonText = 'Update Cart';
    }

    if (item === undefined)
      return (<Error location={location}/>);

    return (<Container>
        <Row>
          <Col>
            {JSON.stringify(item)}
          </Col>
          <Col>
        <Button variant={buttonVariant} onClick={this.changeCart}>{buttonText}</Button>
          </Col>
        </Row>

        <Row>
          <Button onClick={this.incrementCount}>+</Button>
        </Row>
        <Row>
          {this.state.count}
        </Row>
        <Row>
          <Button onClick={this.decrementCount}>-</Button>
        </Row>

        <h3>Recommended for you:</h3>
        <Recommendation />

    </Container>);
  }
}

const dispatchToProps = dispatch => bindActionCreators({addItem, modifyItem, removeItem}, dispatch);

const mapStateToProps = ({cart, items}, props) => {
  const {id} = props.match.params;
  const inCart = Object.keys(cart.items).includes(id);
  const quantity = cart.items[id] || 1;
  const item = items[id]
  return {id, inCart, item, quantity};
};
export default connect(mapStateToProps,dispatchToProps)(ItemPage);
