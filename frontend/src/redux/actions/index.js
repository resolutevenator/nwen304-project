export const REFRESH_ITEMS = 'ITEMS:REFRESH_ITEMS';
export const ADD_ITEM_CART = 'CART:ADD_ITEM';
export const REMOVE_ITEM_CART = 'CART:RM_ITEM';
export const MODIFY_ITEM_CART = 'CART:CHNG_ITEM';
export const GET_USER_DATA = 'AUTH:PROFILE_DATA';
export const LOGIN = 'AUTH:LOGIN';
export const LOGOUT = 'AUTH:LOGOUT';

export {getAllItems, login, passwordReset, purchase, getUser, registerUser} from './remote';


export const logout = () => ({
  type: LOGOUT
});

export const modifyItem = (id, quantity) => {
  return {
    type: MODIFY_ITEM_CART,
    id,
    quantity
  }
};

export const addItem = (id, quantity) => {
  return {
    type: ADD_ITEM_CART,
    id,
    quantity
  }
};

export const removeItem = id => ({
  type: REMOVE_ITEM_CART,
  id
});
