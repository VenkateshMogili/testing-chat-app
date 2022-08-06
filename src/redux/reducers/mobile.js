const {initialStateMobiles} = require('../actions/mobile');

const mobileReducer = (state = initialStateMobiles, action) => {
  switch (action.type) {
    case 'BUY_MOBILE':
      return {...state, numberOfMobiles: state.numberOfMobiles - 1, message: 'Mobile Bought'};
    default:
      return state;
  }
};
module.exports = {
  mobileReducer,
};
