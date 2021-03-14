import fetch from 'isomorphic-fetch';

const graphqlClient = ({ endpoint, query, variables={}, method='POST' }) => {

	return fetch(endpoint, {
		method: method,
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			query: query,
			variables: {...variables}
		}),
	})
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				throw new Error(data.error);
			}
			return data;
		})
		.catch(err => {
			return null;
		});
};

export default graphqlClient;
