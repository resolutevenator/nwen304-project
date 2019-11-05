import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {modifyItem, removeItem} from '../../redux/actions';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class CartPage extends Component {

  render() {
    const {removeItem, modifyItem, user} = this.props;
    const items = Object.keys(this.props.items)
      .map(x => ({...this.props.itemDef[x], quantity: this.props.items[x]}));
    const total = Object.values(this.props.items).reduce((a,b) => a+b,0);

    return <Container>
      {items.map(x=> <CartItem {...x} removeItem={removeItem} modifyItem={modifyItem} key={x.bookid}/>)}
      <hr />
      <br />
      Total: {total}
      <br />
      <hr />
      <br />
      <Button disabled={total === 0 || !user.authtoken}>
        Purchase
      </Button>
    </Container>
  }
}



const {Body, Title, Header} = Card;
function CartItem(props) {
  let {quantity, title, author, description, stock, bookid} = props;
  let incFunc = (n) => () => props.modifyItem(bookid, Math.min(n,stock));
  let decFunc = (n) => () => n === 0 ? props.removeItem(bookid) : props.modifyItem(bookid, n);
  return <Card key={props}>
    <Header>{title}</Header>
    <Body>
      <Title>{author}</Title>
      <Row>
        <Col xs={8} />
        <Col>{quantity}</Col>
        <Col>
          <ButtonGroup>
            <Button onClick={incFunc(quantity+1)}>+</Button>
            <Button onClick={decFunc(quantity-1)}>-</Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Body>
  </Card>;
}


const dispatchToProps = dispatch => bindActionCreators({removeItem, modifyItem}, dispatch);
export default connect(({user, cart, items}) => ({...cart, user, itemDef: items}), dispatchToProps)(CartPage);
