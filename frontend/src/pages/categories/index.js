import React from 'react';
import {connect} from 'react-redux';
import {uniq} from 'lodash';
import {Link} from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

function categoryPage(props) {
  let categories = uniq(Object.values(props.items).map(x=>x.category)).sort();

  return <Container>
    <h1>Category List</h1>
    <ListGroup>
      {categories.map(x => 
        <ListGroup.Item>
          <Link to={`/category/${x}`}>
            {x}
          </Link>
        </ListGroup.Item>
      )}
    </ListGroup>
  </Container>
}

export default connect(({items}) => ( {items} ))(categoryPage)
