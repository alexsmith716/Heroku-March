import { RESTDataSource } from 'apollo-datasource-rest';

const baseUrl = 'https://www.googleapis.com/books';

export class GoogleBooksAPI extends RESTDataSource {
	constructor() {
		super();
		this.baseURL = `${baseUrl}/v1/`
	}

	bookReducer(book) {
		return {
			id: book.id,
			cursor: `${book.id}`,
			title: book.volumeInfo.title,
			authors: book.volumeInfo.authors,
			publisher: book.volumeInfo.publisher,
			publishedDate: book.volumeInfo.publishedDate,
			description: book.volumeInfo.description,
			previewLink: book.volumeInfo.previewLink,
			smallThumbnail: book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail,
			favorite: false,
		};
	}

	async getBooks(searchString, orderBy) {
		try {
			// const route = `volumes?q=${searchString.split(' ').join('+')}&startIndex=${startIndex}&orderBy=${orderBy}&projection=lite&maxResults=${maxResults}`;
			const route = `volumes?q=${searchString.split(' ').join('+')}&startIndex=0&orderBy=${orderBy}&projection=lite&maxResults=40`;
			const response = await this.get(route);
			const reducedResponse = Array.isArray(response.items) ? response.items.map(book => this.bookReducer(book)) : [];
			return reducedResponse;
		} catch (error) {
			return false;
		}
	}

	async getBook({id}) {
		try {
			const route = `volumes/${id}`;
			const response = await this.get(route);
			const reducedResponse = this.bookReducer(response);
			return reducedResponse;
		} catch (error) {
			return false;
		}
	}
};
