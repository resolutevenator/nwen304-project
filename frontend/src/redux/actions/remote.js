import {REFRESH_ITEMS, GET_USER_DATA} from '.';
export const ROOT_URL = '//localhost:5000'

export const getAllItems = () => dispatch => 
    fetch(`${ROOT_URL}/books`)
    .then(x => x.json())
    .then( x => dispatch({
        type: REFRESH_ITEMS,
        items: x
      }))
    .catch( x => {
      console.log(x);
      dispatch({
        type: 'ERROR',
        ...x
      });
    });

export const getUserData = id => dispatch => 
  fetch(`${ROOT_URL}/user/${id}`)
  .then(x => x.json())
  .then(x => dispatch({
    type: GET_USER_DATA,
    ...x
  }))
  .catch(console.error);

export const createUser = (email, password, address) => 
  fetch(`${ROOT_URL}/user/newuser`)
