import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

import {getAllItems} from './actions';


const store = createStore(reducer, applyMiddleware(thunk));

store.dispatch(getAllItems());
export default store;
