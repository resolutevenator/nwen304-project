import {REFRESH_ITEMS} from '../actions';

const initialState = {
  a: {
    name: 'Marley and ME',
    genre: 'Horror',
    author: [
      'testificate'
    ]
  },
  b: {
    name: 'Marley and Me 2',
    genre: ['Horror', 'Comedy'],
    author: [
      'testificate',
      'Jacob'
    ]
  }
};

function reduceItems(state = initialState, action) {
  switch (action.type) {
  case REFRESH_ITEMS:
    return{...action.items};
  default:
    return {...state};
  }
}

export {reduceItems as items};
