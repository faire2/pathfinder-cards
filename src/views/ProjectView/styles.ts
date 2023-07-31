import styled from 'styled-components'

export const ProjectView = styled.div`
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;

	@media print {
		justify-content: flex-start;
	}
`

export const CardWrapper = styled.div`
	transition: all 1s;

	&:hover {
		transform: scale(120%);
	}
`
