import { matchRoutes } from 'react-router-config';

function getPromises(match, store) {
	const arrayHere = match.map((q) => q.route.loadData).filter((r) => r !== undefined);
	return arrayHere.map((a) => a(store));
}

async function asyncGetPromises(routes, pathname, store) {
	const match = matchRoutes(routes, pathname);
	const promises = await getPromises(match, store);
	await Promise.all(promises);
}

export default asyncGetPromises;
