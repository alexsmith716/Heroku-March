import path from 'path';
import express from 'express';
import { createServer } from 'http';
import { apolloServer } from './apolloServer';
import * as renderer from './renderer';
import { getUserAgent } from '../utils/device';
import { isBot } from '../utils/device';
const port = process.env.PORT;

export function startServer() {

	const app = express();

	// =====================================================

	app.use(express.static('dist'));
	
	app.use((req, res, next) => {
		req.userAgent = getUserAgent(req.headers['user-agent']);
		req.isBot = isBot(req.headers['user-agent']);
		next();
	});

	apolloServer(app);

	app.get('*', (req, res, next) => { 
			//console.log('>>>> SERVER > RENDERER !!!! ===========================');
			next();
		}, renderer.get
	);

	// =====================================================

	const server = createServer(app);

	server.listen(port, () => {
		//console.log(`Listening at 8080 ++++++++++++++++++`);
	});
	
	return app;
}
