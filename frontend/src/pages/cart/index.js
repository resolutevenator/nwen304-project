import React, {Component} from 'react';
import {connect} from 'react-redux';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class CartPage extends Component {

  render() {
    const items = Object.keys(this.props.items)
      .map(x => ({...this.props.itemDef[x], quantity: this.props.items[x]}));

    return items.map(x=> <CartItem {...x} />);
  }
}



const {Body, Title} = Card;
function CartItem(props) {
  return <Card>
    <Body>
      <Title>{props.name}</Title>
    </Body>
  </Card>;
}


    export default connect(({cart, items}) => {
      return {...cart, itemDef: items};
    })(CartPage);
