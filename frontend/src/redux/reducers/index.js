import {combineReducers} from 'redux';
import {items} from './items';
import {cart} from './cart';
import {user} from './auth';

export default combineReducers({items, cart, user});
