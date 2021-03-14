import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from '../graphql/schema/schema';
import { resolvers, dataSources } from '../graphql/resolvers/resolvers';

// ===============================================

export function apolloServer(app) {
	
	const apollo = new ApolloServer({
		typeDefs,
		resolvers,
		dataSources,
	});

	apollo.applyMiddleware({ app, path: '/graphql' });
}
