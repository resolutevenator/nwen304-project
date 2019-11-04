import React from 'react';
import {connect} from 'react-redux';

import ItemList from '../../components/item_list';
import Error from '../../components/error';

function CategoryPage(props) {
  let {items, match} = props;
  const {id} = match.params;
  items = Object.keys(items)
    .filter(x => items[x].category === id);

  if(items.length === 0)
    return <Error location={props.location}/>
  return <ItemList items={items} />;
}

export default connect(({items}) => ({items}))(CategoryPage);
