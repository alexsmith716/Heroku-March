import path from 'path';
import React from 'react';
import { renderToNodeStream, renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { Router, StaticRouter } from 'react-router';
import { createMemoryHistory } from 'history';
import { renderRoutes } from 'react-router-config';
import { HelmetProvider } from 'react-helmet-async';
import { ChunkExtractor } from '@loadable/server';
import { ServerStyleSheet } from 'styled-components';
import { ApolloProvider, gql } from '@apollo/client';
import { getDataFromTree } from '@apollo/client/react/ssr';

import { apolloClient } from '../apollo/apolloClient';
import asyncGetPromises from '../utils/asyncGetPromises';
import routes from '../client/routes';
import configureStore from '../redux/configureStore';
import initialStatePreloaded from '../redux/initial-preloaded-state';
import { getUserAgent, isBot } from '../utils/device';
import Html from '../helpers/Html';
import { apiClient } from '../helpers/apiClient';
// -------------------------------------------------------------------

import { GetRickAndMortyCharacter, GetRickAndMortyCharacterIdOne } from '../graphql/queries/queries.graphql';
import * as graphqlQueries from '../graphql/queries/queries';

// -------------------------------------------------------------------

//	const nodeStats = path.resolve(__dirname, '../../dist/node/loadable-stats.json');
const webStats = path.resolve(__dirname, '../../dist/web/loadable-stats.json');
//	const targetPathNode = path.resolve(__dirname, '../../dist/node');

// -------------------------------------------------------------------

export async function get(req, res) {

	const history = createMemoryHistory({ initialEntries: [req.originalUrl] });

	const preloadedState = initialStatePreloaded(req);

	const providers = {
		client: apiClient(req),
	};

	const store = configureStore({
		history,
		data: { ...preloadedState },
		helpers: providers,
	});

	const sheet = new ServerStyleSheet();

	// =====================================================

	const clientApollo = apolloClient({ uri: 'https://sleepy-wave-92667.herokuapp.com/graphql', ssrMode: true });

	// =====================================================
	//	const nodeExtractor = new ChunkExtractor({
	//		statsFile: nodeStats,
	//		outputPath: targetPathNode,
	//	})
	//	const { default: App } = nodeExtractor.requireEntrypoint();
	// =====================================================

	clientApollo.writeQuery({
		query: gql`
			query GetCartItems {
				cartItems
			}
		`,
		data: {
			cartItems: ['itemA', 'itemB', 'itemC'],
		},
	});

	const helmetContext = {};
	const context = {};

	const App = (
		<HelmetProvider context={helmetContext}>
			<ApolloProvider client={clientApollo}>
				<Provider store={store}>
					<Router history={history}>
						<StaticRouter location={req.originalUrl} context={context}>
							{renderRoutes(routes)}
						</StaticRouter>
					</Router>
				</Provider>
			</ApolloProvider>
		</HelmetProvider>
	);

	if (context.url) {
		return res.redirect(301, context.url);
	}

	const { location } = history;
	const loc = location.pathname + location.search;

	if (decodeURIComponent(req.originalUrl) !== decodeURIComponent(loc)) {
		return res.redirect(301, location.pathname);
	}

	try {

		await asyncGetPromises(routes, req.path, store);

		const extractor = new ChunkExtractor({ statsFile: webStats });

		const tree = extractor.collectChunks(App);

		await getDataFromTree(tree);

		const content = renderToString(sheet.collectStyles(tree));

		const linkElements = extractor.getLinkElements();
		const styleElements = extractor.getStyleElements();
		const scriptElements = extractor.getScriptElements();

		const styledComponents = sheet.getStyleElement();

		const storeState = JSON.stringify(store.getState());
		const graphqlState = JSON.stringify(clientApollo.extract());

		const html = (
			<Html
				linkElements={linkElements}
				styleElements={styleElements}
				scriptElements={scriptElements}
				store={storeState}
				content={content}
				styledComponents={styledComponents}
				graphqlState={graphqlState}
			/>
		);

		const ssrHtml = `<!DOCTYPE html>${renderToString(html)}`;
		return res.status(200).send(ssrHtml);
	} catch (error) {
		return res.status(500).send(error);
		hydrate();
	} finally {
		sheet.seal()
	}
};
