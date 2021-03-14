import { paginateResults } from '../utils/utils';
import { GoogleBooksAPI } from '../datasources/googleBooksAPI';
import { RickAndMortyAPI } from '../datasources/rickAndMortyAPI';
import graphqlClient from '../../apollo/graphqlClient';

import { GET_RICK_AND_MORTY_CHARACTER, GET_RICK_AND_MORTY_CHARACTERS, GET_RICK_AND_MORTY_CHARACTERS_BY_IDS, } from '../queries/queries';

export const dataSources = () => ({
	googleBooks: new GoogleBooksAPI(),
	rickAndMorty: new RickAndMortyAPI(),
});

export const resolvers = {
	Query: {
		hello: () => 'Hello world!',

		googleBooks: async (obj, { after, searchString, orderBy, pageSize = 2, }, { dataSources }) => {
			try {
				const allGoogleBooks = await dataSources.googleBooks.getBooks(searchString, orderBy);
				const books = paginateResults({ after, pageSize, results: allGoogleBooks });

				return {
					cursor: books.length ? books[books.length - 1].cursor : null,
					hasMore: books.length
						? books[books.length - 1].cursor !==
							allGoogleBooks[allGoogleBooks.length - 1].cursor
						: false,
					books,
				};
			} catch (error) {
				return false;
			}
		},

		googleBook: async (obj, { id }, { dataSources }) => {
			try {
				const book = await dataSources.googleBooks.getBook({ id });
				return book;
			} catch (error) {
				return false;
			}
		},

		character: async (obj, { id }, { dataSources }) => {
			try {
				const character = await dataSources.rickAndMorty.getCharacter({ id });
				return character;
			} catch (error) {
				return false;
			}
		},

		characters: async (obj, { page, filter }, { dataSources }) => {
			try {
				const characters = await dataSources.rickAndMorty.getCharacters({ page, filter });
				return characters;
			} catch (error) {
				return false;
			}
		},

		charactersByIds: async (obj, { ids }, { dataSources }) => {
			try {
				const charactersByIds = await dataSources.rickAndMorty.getCharactersByIds({ ids });
				return charactersByIds;
			} catch (error) {
				return false;
			}
		},
	},

	Mutation: {
		googleBookModifyFavorite: async (obj, { id, favorite }, { dataSources }) => {
			try {
				const book = await dataSources.googleBooks.getBook({ id });
				book.favorite = favorite;
				return {
					success: true,
					message: 'added to favorites',
					book: book,
				};
			} catch (error) {
				return false;
			}
		},
	},
};
