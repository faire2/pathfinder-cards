import { styled } from 'styled-components'
import { doNotPrint, fontGoodRegular, fontgoodCondensedBold, traitStyle } from './commonStyles'


export const Home = styled.div`
	display: flex;
`

export const ProjectName = styled.h1`
	text-align: center;
	${fontGoodRegular}
	font-weight: bold;
	color: #5d0000;
	letter-spacing: 1px;
`

export const MainButtons = styled.div`
	${doNotPrint}
	display: flex;
	flex-flow: column;
	margin: 10px;
	width: 170px;
`

export const PrimaryButton = styled.button`
	${traitStyle}
	padding: 5px;
	margin: 10px;
	cursor: pointer;

	&:disabled {
		background-color: #bda0a0;
	}
`
