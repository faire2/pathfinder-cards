import styled, { css } from 'styled-components'
import { Colors, traitStyle } from './commonStyles'
import Link from 'next/link'


const primaryStyle = css`
	${traitStyle}
	padding: 5px;
	margin: 10px;
	cursor: pointer;
	transition: all 0.3s;
	text-decoration: none;

	&:disabled {
		background-color: ${Colors.DarkRedDisabled};
	}

	&:hover {
		opacity: 0.7;
	}
`

export const PrimaryButton = styled.button`
	${primaryStyle}
`

export const PrimaryLink = styled(Link)`
	${primaryStyle}
`

export const PrimaryButtonRound = styled(PrimaryButton)`
	height: 25px;
	width: 25px;
	border-radius: 12.5px;

	display: flex;
	justify-content: center;
	align-items: center;
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

export const CancelButton = styled.div`
	color: ${Colors.DarkRed};
	width: 20px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	&::before {
		content: '×';
	}
`

export const FlexRow = styled.div`
	display: flex;
	align-items: center;
`

export const FlexColumn = styled.div`
	display: flex;
	flex-flow: column;
`
