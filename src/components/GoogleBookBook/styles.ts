import styled from 'styled-components';

export const Thumbnail = styled.div`
	display: flex;
	justify-content: center;

	@media screen and (max-width: 992px) {
		justify-content: flex-start;
	}
`;
