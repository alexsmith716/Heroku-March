
export default (charactersCurrentSearchStringVar) => {
	return (searchString) => {
		charactersCurrentSearchStringVar(searchString);
	}
}
