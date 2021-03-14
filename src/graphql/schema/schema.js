import gql from 'graphql-tag';

export const typeDefs = gql`
	scalar ObjID

	type Query {
		hello: String

		googleBooks(
			after: String,
			searchString: String!
			orderBy: String!
			pageSize: Int,
		): GoogleBookConnection

		googleBook(id: ID!): Book

		character(id: ID!): Character

		characters(page: Int, filter: FilterCharacter): Characters

		charactersByIds(ids: [ID!]!): [Character]
	}

	type Mutation {
		googleBookModifyFavorite(
			id: ID!
			favorite: Boolean
		): GoogleBooksUpdateResponse!
	}

	type RickAndMortyCharacterConnection {
		cursor: String!
		hasMore: Boolean!
		characters: [Character]!
	}

	type GoogleBooksUpdateResponse {
		success: Boolean!
		message: String
		book: Book
	}

	type GoogleBookConnection {
		cursor: String!
		hasMore: Boolean!
		books: [Book]!
	}

	type Book {
		id: ID!
		title: String
		subtitle: String
		authors: [String]
		publisher: String
		publishedDate: String
		description: String
		previewLink: String
		smallThumbnail: String
		favorite: Boolean
	}

	type Characters {
		info: Info
		results: [Character]
	}

	type Locations {
		info: Info
		results: [Location]
	}

	type Episodes {
		info: Info
		results: [Episode]
	}

	type Character {
		id: ID
		name: String
		status: String
		species: String
		type: String
		gender: String
		origin: Location
		location: Location
		image: String
		episode: [Episode]
		created: String
	}

	type Location {
		id: ID
		name: String
		type: String
		dimension: String
		residents: [Character]
		created: String
	}

	type Episode {
		id: ID
		name: String
		air_date: String
		episode: String
		characters: [Character]
		created: String
	}

	type Info {
		count: Int
		pages: Int
		next: Int
		prev: Int
	}

	input FilterCharacter {
		name: String
		status: String
		species: String
		type: String
		gender: String
	}

	input FilterLocation {
		name: String
		type: String
		dimension: String
	}

	input FilterEpisode {
		name: String
		episode: String
	}
`;
