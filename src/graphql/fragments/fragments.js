import { gql } from '@apollo/client';

export const fragmentTypeRickAndMortyCharacter = `
	fragment fragmentTypeRickAndMortyCharacter on Character {
		id
		name
		status
		species
		type
		gender
		origin {
			name
			type
			dimension
		}
		location {
			name
			type
			dimension
		}
		image
		episode {
			name
			episode
		}
	}
`;

//	favorite @client
export const fragmentTypeBook = `
	fragment fragmentTypeBook on Book {
		id
		title
		authors
		publisher
		publishedDate
		description
		smallThumbnail
    favorite
	}
`;

export const fragmentTypeDroid = gql`
	fragment fragmentTypeDroid on Droid {
		id
		name
		friends {
			id
			name
		}
		appearsIn
		primaryFunction
	}
`;
