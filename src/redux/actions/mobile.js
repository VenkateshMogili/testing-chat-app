const initialStateMobiles = {
  numberOfMobiles: 100,
};
const buyMobile = () => {
  return {type: 'BUY_MOBILE'};
};

module.exports = {
  initialStateMobiles,
  buyMobile,
};
