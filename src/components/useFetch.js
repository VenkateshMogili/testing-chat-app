import { useDebugValue, useEffect, useReducer, useState } from "react";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const query = gql`{
person(id:"1"){
    name
  }
}`;

const intialState = {
	data: [],
	error: "",
	loading: "",
};

export function FetchData() {
	const runningQuery = useQuery(query);
	let user = runningQuery.data && runningQuery.data.person;
	console.log(user);

	return runningQuery.error ? <div>Error in GraphQL query : <pre>{JSON.stringify(runningQuery.error, null, 2)}</pre></div> :
	 !user ? <div>loading...</div> :
    <div>Data: {user.name}
      <ul>
        {/* {user.books.map(book => <li>{book.name}</li>)} */}
      </ul>
    </div>
}

function apiReducer(state, action) {
	switch (action.type) {
		case "FETCH_DATA_REQUEST":
			return { ...state, loading: "yes" };
		case "FETCH_DATA_FAILURE":
			return { ...state, loading: "", error: action.payload };
		case "FETCH_DATA_SUCCESS":
			return { ...state, loading: "", data: action.payload };
		default:
			return state;
	}
}

export const useFetch = (url, method, headers, body = {}) => {
	const [ data, setData ] = useState([]);
	const [ state, dispatch ] = useReducer(apiReducer, intialState);
	useDebugValue(state);
	useEffect(
		() => {
			dispatch({ type: "FETCH_DATA_REQUEST" });
			let methodType = method;
			if (methodType === "post") {
				fetch(url, {
					method,
					headers,
					body: JSON.stringify(body),
				})
					.then((response) => response.json())
					.then((data) => {
						setData(data);
						dispatch({ type: "FETCH_DATA_SUCCESS", payload: data });
					})
					.catch((error) => {
						dispatch({ type: "FETCH_DATA_FAILURE", payload: error.toString() });
					});
			} else {
				fetch(url)
					.then((response) => response.json())
					.then((data) => {
						setData(data);
						dispatch({ type: "FETCH_DATA_SUCCESS", payload: data });
					})
					.catch((error) => {
						dispatch({ type: "FETCH_DATA_FAILURE", payload: error.toString() });
					});
			}
		},
		[ url ],
	);
	return state;
};
