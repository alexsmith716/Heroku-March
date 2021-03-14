import React from 'react';

import { Thumbnail, ThumbnailImage } from '../../styles';

export const RickAndMortyCharacter = ({ character }) => {

	return (
		<div className="row-flex">

			<div className="col-two">

				<Thumbnail>
					<div className="text-center">
						{ character.image
							?
							<div>
								<ThumbnailImage src={character.image} alt={character.name}/>
							</div>
							:
							<div><i>Image not found</i></div>
						}
					</div>
				</Thumbnail>
			</div>

			<div className="col-ten">

				<div>{character.name ? <h3>{character.name}</h3> : <i>Name not found</i>}</div>

				<div><b>Status:&nbsp;</b>{character.status ? character.status : <i>n/a</i>}</div>

				<div><b>Species:&nbsp;</b>{character.species ? character.species : <i>n/a</i>}</div>

				<div><b>Type:&nbsp;</b>{character.type ? character.type : <i>n/a</i>}</div>

				<div><b>Gender:&nbsp;</b>{character.gender ? character.gender : <i>n/a</i>}</div>

				<div><b>ID:&nbsp;</b>{character.id ? character.id : <i>n/a</i>}</div>

			</div>
		</div>
	);
};
