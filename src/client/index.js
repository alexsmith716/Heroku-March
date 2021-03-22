import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import { loadableReady } from '@loadable/component';
import localForage from 'localforage';
import { getStoredState } from 'redux-persist';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '../apollo/apolloClient';
import asyncGetPromises from '../utils/asyncGetPromises';
import RouterTrigger from '../components/RouterTrigger/RouterTrigger';
import routes from './routes';
import { apiClient } from '../helpers/apiClient';
import configureStore from '../redux/configureStore';
import isOnline from '../utils/isOnline';
import '../styled/fonts.css';

import { ThemeContext } from '../styled/ThemeContext';

const persistConfig = {
	key: 'root',
	storage: localForage,
	stateReconciler(inboundState, originalState) {
		// preloadedState from window object
		return originalState;
	},
};

const spinnerContainer = document.createElement('div');
spinnerContainer.classList.add('spinner-progress');
const dest = document.getElementById('react-root');
document.body.insertBefore(spinnerContainer, dest);

const client = apiClient();

const providers = {
	client,
};

// =====================================================

const render = async () => {
	// redux-persist:
	// delays rendering of app UI until persisted state has been retrieved and saved to redux
	const preloadedState = await getStoredState(persistConfig);
	const online = window.REDUX_DATA ? true : await isOnline();
	const history = createBrowserHistory();

	const store = configureStore({
		history,
		data: {
			...preloadedState,
			...window.REDUX_DATA,
			online,
		},
		helpers: providers,
		persistConfig,
	});

	// =====================================================

	const clientApollo = apolloClient({ uri: 'https://sleepy-wave-92667.herokuapp.com/graphql', ssrMode: false });

	// =====================================================

	const triggerHooks = async (hydrateRoutes, pathname) => {
		spinnerContainer.classList.add('spinner');
		if (window.__PRELOADED__) {
			delete window.__PRELOADED__;
		} else {
			await asyncGetPromises(hydrateRoutes, pathname, store);
		}
		spinnerContainer.classList.remove('spinner');
	};

	const hydrate = (hydrateRoutes) => {
		const element = (
			<HelmetProvider>
				<ApolloProvider client={clientApollo}>
					<Provider store={store}>
						<Router history={history}>
							<ThemeContext>
								<RouterTrigger triggerProp={(pathname) => triggerHooks(hydrateRoutes, pathname)}>
									{renderRoutes(hydrateRoutes)}
								</RouterTrigger>
							</ThemeContext>
						</Router>
					</Provider>
				</ApolloProvider>
			</HelmetProvider>
		);

		if (dest.hasChildNodes()) {
			ReactDOM.hydrate(element, dest);
		} else {
			ReactDOM.render(element, dest);
		}
	};

	hydrate(routes);
};

loadableReady(() => {
	render();
});
