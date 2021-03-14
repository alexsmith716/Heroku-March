import { postRequestConcatExportASYNC } from '../../utils/mockAPI';

const LOAD = 'redux-example/infoAlertThree/LOAD';
const LOAD_SUCCESS = 'redux-example/infoAlertThree/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/infoAlertThree/LOAD_FAIL';

export type Actions = { type: typeof LOAD } | { type: typeof LOAD_SUCCESS } | { type: typeof LOAD_FAIL };

export type State = {
	loading: boolean;
	loaded: boolean;
	error: true | null;
	errorResponse: any;
	data: any;
};

export const initialState: State = {
	loading: false,
	loaded: false,
	error: null,
	errorResponse: null,
	data: null,
};

type LoadActions = {
	types: string[];
	promise: () => Promise<{ time: any; delay: any; message: any; status: any }>;
};

export const reducer = (state: State = initialState, action: Actions): State => {
	switch (action.type) {
		case LOAD:
			return {
				...state,
				loading: true,
			};

		case LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				data: action,
			};

		case LOAD_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				// error: action.error,
				error: true,
				errorResponse: { message: action, documentation_url: '' },
			};

		default:
			return state;
	}
};

export function isInfoAlertThreeLoaded(storeState: State): boolean {
	return storeState && storeState.loaded;
}

export function loadInfoAlertThree(): LoadActions {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: () =>
			postRequestConcatExportASYNC('resolve', true, 110, null).then((result: any) => {
				return result;
			}),
	};
}
