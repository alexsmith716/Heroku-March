import { Middleware, Dispatch } from 'redux';

export default function clientMiddleware(helpers: any): Middleware {
	return ({ dispatch, getState }) => (next: Dispatch) => (action) => {
		if (typeof action === 'function') {
			return action(dispatch, getState);
		}

		// allow the action creators access to the client API facade
		const { promise, types, ...rest } = action;

		if (!promise) {
			// {
			//   "type": "redux-example/filterableTable/SELECTED_OPTION",
			//   "option": "https://api.github.com/emojis",
			//   "meta": {"__multireducerKey": "AboutOneMultireducerFilterableTable1"}
			// }
			//
			return next(action);
		} else {
			//
		}

		// allow some (async) actions to pass a "promise generator"
		const [REQUEST, SUCCESS, FAILURE] = types;

		next({ ...rest, type: REQUEST });

		const actionPromise = promise(helpers, dispatch);

		actionPromise
			.then(
				(result: any) => next({ ...rest, result, type: SUCCESS }),
				(error: Error) => next({ ...rest, error, type: FAILURE }),
			)
			.catch((error: Error) => {
				console.error('MIDDLEWARE ERROR:', error);
				next({ ...rest, error, type: FAILURE });
			});

		// returning "Promise"
		return actionPromise;
	};
}
