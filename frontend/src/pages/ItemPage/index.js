import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Error from '../../components/error';
import {addItem} from '../../redux/actions';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class ItemPage extends Component {
  constructor(props) {
    super(props);
    const count = props.cart.items[props.match.params.id] || 1;
    this.state = {
      count
    }
  }

  incrementCount = () => this.setState(({count}) => ({count: count+1}));
  decrementCount = () => this.setState(({count}) => ({count: count-1}));



  render() {
    const {match, items, location} = this.props;
    const {id} = match.params;

    const inCart = Object.keys(this.props.cart.items).includes(id);
    const func = inCart ? this.props.modifyItem : this.props.addItem

    if (!Object.values(items).some(b => b.bookid == id))
      return (<Error location={location}/>);

    const item = Object.values(items).filter(b => b.bookid == id)[0];

    return (<Container>
        <Row>
          <Col>
            {JSON.stringify(item)}
          </Col>
          <Col>
        <Button onClick={() => func(id, this.state.count)}>Hello</Button>
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



    </Container>);
  }
}

const dispatchToProps = dispatch => bindActionCreators({addItem}, dispatch);
export default connect(({cart, items}) => ({cart, items}),dispatchToProps)(ItemPage);
