import React, { useState, useEffect } from 'react';
//  import { State as ThemeState } from '../../redux/modules/theme';

import { useLocation } from 'react-router-dom';
import { NavLinks } from './NavLinks';
import * as Styles from './styles';

import { useTheme } from '../../styled/ThemeContext';

//  export type State = {
//  	theme: ThemeState;
//  };

export const NavBar: React.FC = () => {
	const themeMode = useTheme();
	const location = useLocation();

	const [clicked, setClicked] = useState(false);
	const [activeRoute, setActiveRoute] = useState(location.pathname);

	useEffect(() => {
		setActiveRoute(location.pathname);
		return () => {
			console.log(
				'>>>>>>>>>>>>>>>>>>>>>>>> NavBar > useEffect() > componentWillUnmount > cleanup phase',
			);
		};
	}, [location.pathname]);

	const doThemeToggle = () => {
		themeMode.toggleTheme();
		setClicked(false);
	};

	return (
		<Styles.NavBar>
			<div className="container">
				<Styles.Expand>
					<Styles.NavBarBrandLink
						to="/"
						onClick={() => setClicked(false)}
					>
						Election App
					</Styles.NavBarBrandLink>

					<Styles.NavBarNav clicked={clicked} className={clicked ? 'clicked' : ''}>
						<li>
							<Styles.NavBarNavA onClick={doThemeToggle}>
								use{themeMode.mode === 'dark' ? `Default` : `Dark`}Theme
							</Styles.NavBarNavA>
						</li>

						{NavLinks.map((item, index) => {
							let a = activeRoute === item.url;
							return (
								<li key={index}>
									<Styles.NavBarNavLink
										activelink={a.toString()}
										to={item.url}
										onClick={() => setClicked(false)}
									>
										{item.title}
									</Styles.NavBarNavLink>
								</li>
							);
						})}
					</Styles.NavBarNav>

					<Styles.Toggler onClick={() => setClicked(!clicked)}>
						{clicked && <Styles.StyledSvgTimes fill="#ffffff" />}

						{!clicked && <Styles.StyledSvgBars fill="#ffffff" />}
					</Styles.Toggler>
				</Styles.Expand>
			</div>
		</Styles.NavBar>
	);
};
