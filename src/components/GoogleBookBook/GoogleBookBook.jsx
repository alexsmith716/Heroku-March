import React, { useState, useEffect } from 'react';
import {
	useApolloClient,
} from '@apollo/client';

import Button from '../Button';
import { Thumbnail, ThumbnailImage } from '../../styles';
import { READ_BOOK_FAVORITE } from '../../graphql/queries/queries.js';

export const GoogleBookBook = ({ book }) => {

	const [toggleDescriptionView, setToggleDescriptionView] = useState(false);
	const [readBookFavorite, setReadBookFavorite] = useState(null);

	const client = useApolloClient();

	const upgradeThumbnailURL = (url) => {
		const upgrade = url.replace(/^http:\/\//i, 'https://');
		return upgrade;
	};

	useEffect(() => {
			if (readBookFavorite) {
				//	console.log('>>>>>>>>>>>>> GoogleBookBook > useEffect > readBookFavorite: ', readBookFavorite);

				const { googleBooks: { favorite }} = readBookFavorite;

				client.cache.modify({
					id: client.cache.identify(readBookFavorite.googleBooks),
					fields: {
						favorite(cachedName) {
							return !favorite;
						},
					},
					broadcast: true // default
				});
			}
		},
		[readBookFavorite,]
	);

	return (
		<div className="row-flex">

			<div className="col-two">

				<Thumbnail>
					<div className="text-center">
						{book.smallThumbnail
							?
							<div>
								<ThumbnailImage src={upgradeThumbnailURL(book.smallThumbnail)} alt={book.title}/>
							</div>
							:
							<div><i>Image not found</i></div>
						}
						<div>
							<Button
								className="btn-light btn-tiny"
								onClick={() => setReadBookFavorite(client.readQuery({ query: READ_BOOK_FAVORITE, variables: { id: `${book.id}` }}))}
								buttonText={`${book.favorite ? "Remove from" : "Add to"} Favorites`}
							/>
						</div>
					</div>
				</Thumbnail>
			</div>

			<div className="col-ten">

				<div>{book.title ? <h3>{book.title}</h3> : <i>Title not found</i>}</div>

				<div><b>Authors:&nbsp;</b>{book.authors ? book.authors.join(', ') : <i>n/a</i>}</div>

				<div><b>Publisher:&nbsp;</b>{book.publisher ? book.publisher : <i>n/a</i>}</div>

				<div><b>Published Date:&nbsp;</b>{book.publishedDate ? book.publishedDate : <i>n/a</i>}</div>

				<div><b>ID:&nbsp;</b>{book.id ? book.id : <i>n/a</i>}</div>

				<div><b>Favorite:&nbsp;</b>{book.favorite ? <i>true</i> : <i>false</i>}</div>

				{book.description &&
					<>
						<div className={!toggleDescriptionView ? 'text-overflow-ellipsis' : ''}>
							{book.description}
						</div>
						<Button
							className="btn-light btn-tiny"
							onClick={() => setToggleDescriptionView(!toggleDescriptionView)}
							buttonText={toggleDescriptionView ? "<< Less" : "More >>"}
						/>
					</>
				}
			</div>
		</div>
	);
};
