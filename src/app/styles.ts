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

export const Project = styled.div`
	display: flex;
	flex-wrap: wrap;
`

export const MenuWrapper = styled.div`
	display: flex;
`

const leftMenuWidth = 170
export const ViewWrapper = styled.div`
	max-width: calc(100% - ${leftMenuWidth}px);
`

export const LeftMenuWrapper = styled.div`
	${doNotPrint}
	display: flex;
	flex-flow: column;
	width: ${leftMenuWidth}px;
`

export const ProjectName = styled.h1`
	${doNotPrint}
	${fontGoodRegular}
	text-align: center;
	font-weight: bold;
	color: ${Colors.DarkRed};
	letter-spacing: 1px;
`
