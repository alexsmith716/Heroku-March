import React from 'react';
import { Helmet } from 'react-helmet-async';
import * as Styles from './styles';

const Home = () => {
	return (
		<>
			<Helmet title="Home" />

			{/* ---------------------------------------------- */}

			<Styles.Masthead className="mb-5">
				<div className="container">
					<Styles.MastheadHeadingOne>App 2022</Styles.MastheadHeadingOne>

					<Styles.MastheadHeadingTwo>
						The Midterms are right around the corner!
					</Styles.MastheadHeadingTwo>

					<Styles.MastheadBlurb>What are you and others saying?</Styles.MastheadBlurb>

					<Styles.MastheadBlurbElipsis>... join the conversation.</Styles.MastheadBlurbElipsis>

					<Styles.MastheadButton
						className="btn-success"
						onClick={() => false}
						type="button"
						buttonText="Sign Up Now 1 »"
					/>
	
				</div>
			</Styles.Masthead>

			{/* ---------------------------------------------- */}

			<div className="container">
				<div className={`mb-5 cardContainerGrid`}>
					<div className="container-padding-border-radius-2">
						<div>
							<h4>Card Title 1</h4>
							<div>
								<p>
									Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac
									cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo
									sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed
									odio dui.
								</p>
							</div>
							<div>
								<a href="#">More Info</a>
							</div>
						</div>
					</div>

					<div className="container-padding-border-radius-2">
						<div>
							<h4>Card Title 2</h4>
							<div>
								<p>
									Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac
									cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo
									sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed
									odio dui.
								</p>
							</div>
							<div>
								<a href="#">More Info</a>
							</div>
						</div>
					</div>

					<div className="container-padding-border-radius-2">
						<div>
							<h4>Card Title 3</h4>
							<div>
								<p>
									Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac
									cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo
									sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed
									odio dui.
								</p>
							</div>
							<div>
								<a href="#">More Info</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
