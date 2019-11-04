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
  render() {
    const {match, items, location} = this.props;
    const {id} = match.params;

    const inCart = Object.keys(this.props.cart.items).includes(id);

    if (!Object.values(items).some(b => b.bookid == id))
      return (<Error location={location}/>);

    const item = Object.values(items).filter(b => b.bookid == id)[0];

    return <Container>
        
        <Row>
          <Col>
            {JSON.stringify(item)}
          </Col>
          <Col>
        {inCart ? 'true' : 'false'}
        <Button onClick={() => this.props.addItem(id, 1)}>Hello</Button>
          </Col>
        </Row>
    </Container>;
  }
}

const dispatchToProps = dispatch => bindActionCreators({addItem}, dispatch);
export default connect(({cart, items}) => ({cart, items}),dispatchToProps)(ItemPage);
