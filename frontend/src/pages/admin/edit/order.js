import React, {Component} from 'react';
import {connect} from 'react-redux';

import {removeOrder, modifyOrder} from '../../../redux/actions/remote';

import {groupBy, identity} from 'lodash';

import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

const {Body, Title} = Card;
const {Item} = ListGroup;

const status = ['processing', 'shipping', 'delivered'];

class EditOneOrder extends Component {
  state = {
    productid: this.props.productid,
    cost: this.props.cost,
    current_status: this.props.current_status
  };

  add = (bookid) => () => this.setState({productid: this.state.productid.concat([bookid])});
  remove = (bookid) => () => {
    let {productid} = this.state;
    productid = [...productid];
    const idx = productid.findIndex(e => e === bookid)
    console.log(idx)
    if (idx === -1)
      return;
    console.log(productid.splice(idx, 1));

    this.setState({productid});
  }

  render() {
    const {email, address, time, items, rm, token} = this.props;
    const {productid, cost, current_status} = this.state;
    const grouped = groupBy(productid, identity);
    const products = Object.keys(grouped).map(x => ({...items[x], quantity: grouped[x].length}));

    const submitModify = () => modifyOrder(token, email, time, current_status, productid, cost);

    return <Card>
      <Body>
        <Title>{email} - {new Date(+time).toDateString()}</Title>
        Cost <Form.Control type='text' value={cost} onChange={({target}) => this.setState({cost: target.value})}
          pattern='^\$[0-9.]*$'/>
        Address:
        <code>
          {address}
        </code>
        <ListGroup>
          {products.map(x => <Item key={x.bookid}>
            {x.title} <i>By {x.author}</i> x {x.quantity}
            <ButtonGroup>
              <Button onClick={this.remove(x.bookid)}>-</Button>
              <Button onClick={this.add(x.bookid)}>+</Button>
            </ButtonGroup>
          </Item>)}
          <Item>
            <Dropdown>
              <Dropdown.Toggle variant='primary'>
                Add Item to Order
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.values(items).map(item => 
                  <Dropdown.Item key={item.bookid} onClick={this.add(item.bookid)}>
                    {item.title} <i>By {item.author}</i>
                  </Dropdown.Item>)}
              </Dropdown.Menu>
            </Dropdown>
          </Item>
        </ListGroup>
        Status:
        <Dropdown>
          <Dropdown.Toggle>
            {current_status}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {status.map(current_status =>
              <Dropdown.Item key={current_status} onClick={()=>this.setState({current_status})}>
                {current_status}
              </Dropdown.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
        <Button variant='warning' onClick={submitModify}> Change! </Button>

        <Button variant='danger' onClick={() =>
            removeOrder(token, email, time).then(() => rm(this.props))
        }> Delete! </Button>
      </Body>
    </Card>;
  }
}


const mapStateToProps = ({items}) => ({items});

export default connect(mapStateToProps)(EditOneOrder);
