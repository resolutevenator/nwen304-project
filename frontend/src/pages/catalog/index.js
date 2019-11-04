import React from 'react';
import {connect} from 'react-redux';
import ItemList from '../../components/item_list';


function CatalogPage(props) {

  let {items} = props;
  items = Object.keys(items);

  return <ItemList items={items} />

}





export default connect(({items}) => ({items}))(CatalogPage);
