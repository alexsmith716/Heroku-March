import React from 'react';
import { Helmet } from 'react-helmet-async';
import * as Styles from './styles';

const AboutB = () => {

	return (
		<>
			<Helmet title="About B" />

			{/* ---------------------------------------------- */}

			<div className="container">
				{/* ---------------------------------------------- */}

				<h1 className="mt-4 mb-3">AboutB</h1>

				{/* ---------------------------------------------- */}

				<div className="row-grid grid-six bg-lightskyblue-1 mb-5">
					<div className="col-grid mb-4">
						<Styles.AboutImageMain className="img-fluid rounded" src={'/about-750-450.png'} alt={""} />
					</div>

					<div className="col-grid">
						<h2>About Election App 2022</h2>
						<h4>This component utilizes the CSS Grid Layout module.</h4>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe, magni, aperiam
							vitae illum voluptatum aut sequi impedit non velit ab ea pariatur sint quidem
							corporis eveniet. Odit, temporibus reprehenderit dolorum!
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, consequuntur, modi
							mollitia corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam?
							Aut, in eum facere corrupti necessitatibus perspiciatis quis?
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed voluptate nihil eum
							consectetur similique? Consectetur, quod, incidunt, harum nisi dolores delectus
							reprehenderit voluptatem perferendis dicta dolorem non blanditiis ex fugiat.
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe, magni, aperiam
							vitae illum voluptatum aut sequi impedit non velit ab ea pariatur sint quidem
							corporis eveniet. Odit, temporibus reprehenderit dolorum!
						</p>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et, consequuntur, modi
							mollitia corporis ipsa voluptate corrupti eum ratione ex ea praesentium quibusdam?
							Aut, in eum facere corrupti necessitatibus perspiciatis quis?
						</p>
					</div>
				</div>

			</div>
		</>
	);
};

export default AboutB;
