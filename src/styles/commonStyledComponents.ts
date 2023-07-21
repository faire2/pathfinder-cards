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

export const Overlay = styled.div`
	width: 100vw;
	height: 100vh;
	position: absolute;
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
`
export const Paragraph = styled.div`
	padding-bottom: 1%;
`
export const Hr = styled.hr`
	width: 100%;
	border-top: 2px;
`
