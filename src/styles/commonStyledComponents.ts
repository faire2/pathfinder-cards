import styled from 'styled-components'
import { Colors, traitStyle } from './commonStyles'
import Link from 'next/link'


export const PrimaryButton = styled.button`
	${traitStyle}
	padding: 5px;
	margin: 10px;
	cursor: pointer;

	&:disabled {
		background-color: ${Colors.DarkRedDisabled};
	}
`

export const PrimaryLink = styled(Link)`
	${traitStyle}
	padding: 5px;
	margin: 10px;
	cursor: pointer;
	text-decoration: none;

	&:disabled {
		background-color: ${Colors.DarkRedDisabled};
	}
`

export const PageColumn = styled.div`
	display: flex;
	flex-flow: column;
	justify-content: center;
	margin-right: 30px;
`

export const OverlayWrapper = styled.div`
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

export const Label = styled.label`
	color: ${Colors.DarkRed};
	font-size: 90%;
	font-weight: bold;
`
