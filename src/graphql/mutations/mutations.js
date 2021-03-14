import { gql } from '@apollo/client';

export const GOOGLE_BOOK_MODIFY_FAVORITE = gql`
	mutation GoogleBookModifyFavorite($id: ID!, $favorite: Boolean) {
		googleBookModifyFavorite(id: $id, favorite: $favorite) {
			success
			message
			book {
				id
				favorite
			}
		}
	}
`;
