import { gql } from '@apollo/client';
import { fragmentTypeRickAndMortyCharacter, fragmentTypeBook, fragmentTypeDroid } from '../fragments/fragments';

export const GET_HELLO = gql`
	{
		hello
	}
`;

export const GET_RICK_AND_MORTY_CHARACTER = `
	query GetRickAndMortyCharacter($id: ID!) {
		character(id: $id) {
			...fragmentTypeRickAndMortyCharacter
		}
	}
	${fragmentTypeRickAndMortyCharacter}
`;

export const GET_RICK_AND_MORTY_CHARACTERS_BY_IDS = `
	query GetRickAndMortyCharactersByIds($ids: [ID!]!) {
		charactersByIds(ids: $ids) {
			...fragmentTypeRickAndMortyCharacter
		}
	}
	${fragmentTypeRickAndMortyCharacter}
`;

export const GET_RICK_AND_MORTY_CHARACTERS = `
	query GetRickAndMortyCharacters($page: Int, $filter: FilterCharacter){
		characters(page: $page, filter: $filter) {
			info {
				next
				prev
				pages
				count
			}
			results {
				...fragmentTypeRickAndMortyCharacter
			}
		}
	}
	${fragmentTypeRickAndMortyCharacter}
`;

export const GET_CHARACTERS_CURRENT_SEARCH_STRING = gql`
	query GetCharactersCurrentSearchString {
		charactersCurrentSearchString @client {
			currentSearchString
		}
	}
`;

export const GET_GOOGLE_BOOKS_CURRENT_SEARCH_STRING = gql`
	query GetGoogleBooksCurrentSearchString {
		googleBooksCurrentSearchString @client {
			currentSearchString
		}
	}
`;

export const GET_GOOGLE_BOOKS = gql`
	query GetGoogleBooks($after: String, $searchString: String!, $orderBy: String!) {
		googleBooks(after: $after, searchString: $searchString, orderBy: $orderBy) {
			cursor
			hasMore
			books {
				...fragmentTypeBook
			}
		}
	}
	${fragmentTypeBook}
`;

export const READ_BOOK_FAVORITE = gql`
	query ReadBookFavorite($id: ID!) {
		googleBooks(id: $id) {
			id
			favorite
		}
	}
`;

export const GET_GOOGLE_BOOK = gql`
	query GetGoogleBook($id: ID!) {
		googleBook(id: $id) {
			...fragmentTypeBook
		}
	}
	${fragmentTypeBook}
`;

export const GET_REVIEWS = gql`
	query GetReviews($episode: Episode!) {
		reviews(episode: $episode) {
			episode
			stars
			commentary
		}
	}
`;

export const GET_A_DROID = gql`
	query GetADroid($droidID: ID!) {
		droid(id: $droidID) {
			id
			name
			friends {
				id
				name
			}
			appearsIn
			primaryFunction
		}
	}
`;

export const GET_A_DROID_ALIAS = gql`
	query GetADroid($droidIDa: ID!, $droidIDb: ID!) {
		droidIDa: droid(id: $droidIDa) {
			...fragmentTypeDroid
		}
		droidIDb: droid(id: $droidIDb) {
			...fragmentTypeDroid
		}
	}
	${fragmentTypeDroid}
`;

export const ADD_REVIEW = gql`
	mutation createReview($episode: Episode, $review: ReviewInput!) {
		createReview(episode: $episode, review: $review ) {
			episode
			stars
			commentary
		}
	}
`;

export const JUST_GET_REVIEWS = gql`
	query GetEpisodeReviews($episode: Episode!) {
		reviews(episode: $episode)
	}
`;

export const GET_HERO = gql`
	{
		hero {
			name
		}
	}
`;

export const GET_THE_SCHEMA = gql`
	{
		__schema {
			types {
				name
				kind
				description
				fields {
					name
				}
			}
		}
	}
`;
