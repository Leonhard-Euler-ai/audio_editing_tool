export default {
  loginStatus(state) {
  return state.token.length === 0 ? false : true
},
  // token(state) {
  //   console.log("getters" + state.token);
  //   return state.token
  // }
}


