
export default (charactersLastSearchStringVar) => {
	return (searchString) => {
		charactersLastSearchStringVar(searchString);
	}
}
