import { fontGoodRegular, traitStyle } from '@/styles/commonStyles'
import { styled } from 'styled-components'


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
