import createSetGoogleBooksCurrentSearchStringVar from './setGoogleBooksCurrentSearchStringVar';
import createSetCharactersCurrentSearchStringVar from './setCharactersCurrentSearchStringVar';

import { googleBooksCurrentSearchStringVar } from '../../../apollo/apolloClient';
import { charactersCurrentSearchStringVar } from '../../../apollo/apolloClient';

export const reactiveVariableMutations = {
	setGoogleBooksCurrentSearchStringVar: createSetGoogleBooksCurrentSearchStringVar(googleBooksCurrentSearchStringVar),
	setCharactersCurrentSearchStringVar: createSetCharactersCurrentSearchStringVar(charactersCurrentSearchStringVar),
}
