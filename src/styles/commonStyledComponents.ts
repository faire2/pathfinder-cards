import styled from 'styled-components'
import { traitStyle } from './commonStyles'


export const PrimaryButton = styled.button`
	${traitStyle}
	padding: 5px;
	margin: 10px;
	cursor: pointer;

	&:disabled {
		background-color: #bda0a0;
	}
`

export const ViewColumn = styled.div`
	display: flex;
	flex-flow: column;
	justify-content: center;
	margin-right: 30px;
`
