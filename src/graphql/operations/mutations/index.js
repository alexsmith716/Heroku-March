import createSetGoogleBooksLastSearchStringVar from './setGoogleBooksLastSearchStringVar';
import createSetCharactersLastSearchStringVar from './setCharactersLastSearchStringVar';

import { googleBooksLastSearchStringVar } from '../../../apollo/apolloClient';
import { charactersLastSearchStringVar } from '../../../apollo/apolloClient';

export const reactiveVariableMutations = {
  setGoogleBooksLastSearchStringVar: createSetGoogleBooksLastSearchStringVar(googleBooksLastSearchStringVar),
	setCharactersLastSearchStringVar: createSetCharactersLastSearchStringVar(charactersLastSearchStringVar),
}
