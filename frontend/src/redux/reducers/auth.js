import {LOGIN, LOGOUT} from '../actions';
const initialState = {
  authtoken: false,
  profile: false,
};

function reduceUserInfo(state = initialState, action) {
  state = {...state};
  switch(action.type) {
  case LOGIN:
    console.log(action);
    return {
      authtoken: action.token,
      profile: action.profile
    };
  case LOGOUT:
    return initialState;
  default:
    return state;
  }
}

export {reduceUserInfo as user};
