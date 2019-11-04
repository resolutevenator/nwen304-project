import {ADD_ITEM_CART, REMOVE_ITEM_CART, MODIFY_ITEM_CART} from '../actions';

const initialState = {
  items: {
    a: 1,
  }
}
function reduceCart(state = initialState, action) {
  state = {...state};

  switch(action.type) {
    case ADD_ITEM_CART:
      return {items: {...state.items, [action.id]: action.quantity}}
    case MODIFY_ITEM_CART:
      return {items: {...state.items, [action.id]: action.quantity}}
    case REMOVE_ITEM_CART:
      delete state.items[action.id];
      return state;
    default:
      return state;

  }
}

export {reduceCart as cart}
