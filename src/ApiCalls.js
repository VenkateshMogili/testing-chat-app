import axios from 'axios';
 
export const API = 'http://jsonplaceholder.typicode.com/users';
 
export const fetchData = async (id) => {
  const url = `${API}/${id}`;
 
  return await axios.get(url);
};
 
fetchData(1);