import { Colors, doNotPrint, fontGoodRegular } from '@/styles/commonStyles'
import { styled } from 'styled-components'


export const PageContainer = styled.div`
	padding: 20px;
	width: 100%;
`

export const PageTitle = styled.h1`
	${doNotPrint}
	${fontGoodRegular}
	text-align: center;
	font-weight: bold;
	color: ${Colors.DarkRed};
	letter-spacing: 1px;
	margin-bottom: 20px;
`

export const ProjectList = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	border-top: 1px solid ${Colors.Gold};
`

export const ProjectRow = styled.div`
	${fontGoodRegular}
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 15px 20px;
	border-bottom: 1px solid ${Colors.Gold};

	&:hover {
		background-color: ${Colors.Beige};
	}
`

export const ProjectName = styled.span`
	color: ${Colors.DarkRed};
	font-size: 18px;
`

export const ProjectActions = styled.div`
	display: flex;
	gap: 10px;
`

export const EmptyMessage = styled.p`
	${fontGoodRegular}
	text-align: center;
	color: ${Colors.DarkRed};
	font-size: 18px;
	margin-top: 40px;
`