import { styled } from 'styled-components'
import { doNotPrint, fontGoodRegular } from './commonStyles'


export const Home = styled.div`
	display: flex;
`

export const ProjectName = styled.h1`
	${doNotPrint}
	${fontGoodRegular}
	text-align: center;
	font-weight: bold;
	color: #5d0000;
	letter-spacing: 1px;
`
