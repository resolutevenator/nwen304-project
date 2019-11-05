import {REFRESH_ITEMS, LOGIN} from '.';
export const ROOT_URL = '//localhost:5000'


const sendData = (url, method, data) => fetch(url, {
  method,
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  body: JSON.stringify(data)
}).then(x => x.json());

export const getAllItems = () => dispatch => 
  fetch(`${ROOT_URL}/books`)
    .then(x => x.json())
    .then(x => x.map(y => ({[y.bookid]: y})))
    .then(x => x.reduce((a,b) => ({...a, ...b}), {}))
    .then(x => dispatch({
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

export const login = (email, password) => dispatch => sendData(`${ROOT_URL}/login`, 'POST', {email, password})
  .then(async ({token}) => {
    let profile = await sendData(`${ROOT_URL}/user/info`, 'POST', {token});
    return {token, profile};
  })
  .then(d => dispatch({type:LOGIN, ...d}));

export const createUser = (email, password, address) => 
  sendData(`${ROOT_URL}/user/newuser`, 'POST', {email, password, address});

export const passwordReset = email => sendData(`${ROOT_URL}/user/passwordreset`, 'POST', {email});
