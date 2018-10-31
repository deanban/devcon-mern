const initialState = {
  isAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
    // case "TEST_DISPATCH":
    //   return {
    //     ...state,
    //     user: action.payload
    //   };
  }
}
