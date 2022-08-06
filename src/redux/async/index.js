const axios = require('axios');
// users state
const usersData = {
  data: [],
  error: '',
  loading: false,
};
// actions
const fetchUsersRequest = () => {
  return {type: 'FETCH_USERS_REQUEST'};
};
const fetchUsersSuccess = (data) => {
  return {type: 'FETCH_USERS_SUCCESS', payload: data};
};
const fetchUsersFail = (error) => {
  return {type: 'FETCH_USERS_FAIL', error};
};
const usersReducer = (state = usersData, action) => {
  switch (action.type) {
    case 'FETCH_USERS_REQUEST':
      return {...state, loading: true};
    case 'FETCH_USERS_SUCCESS':
      return {...state, data: action.payload[0], loading: false};
    case 'FETCH_USERS_FAIL':
      return {...state, error: action.error.toString()};
    default:
      return state;
  }
};
const fetchUsers = () => {
  return (dispatch) => {
    dispatch(fetchUsersRequest());
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        dispatch(fetchUsersSuccess(response.data));
      })
      .catch((error) => {
        console.log(error);
        dispatch(fetchUsersFail(error));
      });
  };
};

module.exports = {
  usersReducer,
  fetchUsers,
};
