export const paginateResults = ({ after: cursor, pageSize, results, getCursor = () => null }) => {

	// console.log('>>>>>>>>>>>>> graphql > UTILS > cursor: ', cursor)
	// console.log('>>>>>>>>>>>>> graphql > UTILS > results: ', results)

	if (pageSize < 1) return [];

	if (!cursor) return results.slice(0, pageSize);

	// console.log('>>>>>>>>>>>>> graphql > UTILS > cursor: ', cursor)

	const cursorIndex = results.findIndex(item => {
		let itemCursor = item.cursor ? item.cursor : getCursor(item);
		return itemCursor ? cursor === itemCursor : false;
	});

	// console.log('>>>>>>>>>>>>> graphql > UTILS > cursorIndex: ', cursorIndex)

	const theCursorIndex = cursorIndex >= 0
		? cursorIndex === results.length - 1
			? []
			: results.slice(
					cursorIndex + 1,
					Math.min(results.length, cursorIndex + 1 + pageSize),
				)
		: results.slice(0, pageSize);

	// console.log('>>>>>>>>>>>>> graphql > UTILS > theCursorIndex: ', theCursorIndex)

	return theCursorIndex;
};
