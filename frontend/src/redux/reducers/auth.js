const initialState = {

  authtoken: false,
  profile: false,
};

function reduceUserInfo(state = initialState, action) {
  state = {...state};
  switch(action.type) {
    default:
      return state;
  }
}

export {reduceUserInfo as user};
