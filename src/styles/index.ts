import styled from 'styled-components';

export const Thumbnail = styled.div`
	display: flex;
	justify-content: center;

	@media screen and (max-width: 992px) {
		justify-content: flex-start;
	}
`;

export const ThumbnailImage = styled.img`
	width: 128px;
	height: auto;

	@media screen and (max-width: 992px) {
		width: auto;
	}
`;
