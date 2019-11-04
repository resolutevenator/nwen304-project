import React from 'react';


import {connect} from 'react-redux';


import {Link} from 'react-router-dom';

import chunk from 'lodash/chunk';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ItemList(props) {
  let {items, itemDef} = props;
  items = items.map(x => itemDef[x]);

  const rows = chunk(items, 3);

  return (<Container>
   {
      rows.map(x =>
        <Row key={x.join(', ')}>
          {x.map(y => 
            <Col sm={12} md={4} lg={4} key={y}>
              <Card>
                <Card.Img variant='top' src='//via.placeholder.com/150' />
                <Card.Body>
                  <Card.Title> {y.title} </Card.Title>
                  <Card.Subtitle> {y.author} </Card.Subtitle>
                  <Card.Text>
                    {y.description}
                    <br />
                  </Card.Text>
                  <Card.Link as={Link} to={`/item/${y.bookid}`}>
                      Open Page
                  </Card.Link>
                  <Card.Link as={Link} to={`/category/${y.category}`}>
                    Category: {y.category}
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          )
          }
        </Row>
      )
    }
  </Container>);
}

export default connect(({items}) => ({itemDef: items}))
  (ItemList);
