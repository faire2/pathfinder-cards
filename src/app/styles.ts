import { Colors, doNotPrint, fontGoodRegular } from '@/styles/commonStyles'
import { styled } from 'styled-components'

export const PrintPage = styled.div`
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;

	background-color: red;

	> div {
		background-color: red;
	}

	@media print {
	}
`

export const Home = styled.div`
	display: flex;
	flex-wrap: wrap;
`

export const MenuWrapper = styled.div`
	display: flex;
`

export const ProjectName = styled.h1`
	${doNotPrint}
	${fontGoodRegular}
	text-align: center;
	font-weight: bold;
	color: ${Colors.DarkRed};
	letter-spacing: 1px;
`

export const CardWrapper = styled.div`
	cursor: pointer;
	transition: all 1s;

	&:hover {
		transform: scale(120%);
	}
`
