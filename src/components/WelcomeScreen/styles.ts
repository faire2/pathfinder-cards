import { fontGoodRegular, traitStyle } from '@/styles/commonStyles'
import { styled } from 'styled-components'

export const WelcomeScreen = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
	background-color: rgba(0, 0, 0, 0.2);
`

export const Message = styled.div`
	${traitStyle}
	${fontGoodRegular}
	padding: 30px;
	min-width: 20%;
	max-width: 700px;
	opacity: 100%;
	text-transform: none;
	font-size: 20px;
	white-space: pre-line;
`
