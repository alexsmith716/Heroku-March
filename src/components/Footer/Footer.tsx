import React from 'react';
import * as Styles from './styles';

const Footer: React.FC = () => {
	return (
		<Styles.FooterStyled>
			<div className="container">
				<Styles.FooterContainer className="flex-column align-items-center pt-4 pb-4">
					<div>
						Copyright &copy; {new Date().getFullYear()} · Election App 2022
					</div>
					<div className="flex-row align-items-center">
						<Styles.FooterHeadphones>
							<Styles.StyledSvgHeadphones fill="#ffffff" />
						</Styles.FooterHeadphones>
						<Styles.SvgFooterHeadphones>Footer Headphones</Styles.SvgFooterHeadphones>
					</div>
					<Styles.FooterBlurd>Don&apos;t Forget To Vote!</Styles.FooterBlurd>
				</Styles.FooterContainer>
			</div>
		</Styles.FooterStyled>
	);
};

export default Footer;
