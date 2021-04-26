import cluster from 'cluster';
import { cpus } from 'os';
import { startServer } from './serverHeroku';
//	import { startServer } from './serverLocal';

const numCPUs = cpus().length;

if (cluster.isMaster) {
	[...new Array(numCPUs)].forEach(() => cluster.fork());

	// cluster manager
	cluster.on('exit', (worker, code, signal) => {
		console.log(`Restarting ${worker.process.pid}. ${code || signal}`);
		cluster.fork();
	});
} else {
	startServer();
}

process.on('uncaughtException', (err) => {
	console.error(err);
	process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
	console.error(promise);
	console.error(reason);
});
