import { cardHoverZoom, Colors, doNotPrint, fontGoodRegular } from '@/styles/commonStyles'
import { styled } from 'styled-components'


export const CardGrid = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 20px;
	justify-content: flex-start;
`

export const CardItem = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`

export const CardWrapper = styled.div<{ $isActive?: boolean }>`
	${cardHoverZoom}

	/* Apply gold border to the Card itself */
	> div {
		${({ $isActive }) => $isActive && `
			box-shadow: 0 0 0 3px ${Colors.Gold};
		`}
	}

	/* Larger body text for project cards (Card > Body) */
	> div > div:last-child {
		font-size: 150%;
	}
`

export const CardActions = styled.div`
	${doNotPrint}
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	margin-top: -20px;
	width: 100%;
`

export const EmptyMessage = styled.p`
	${fontGoodRegular}
	text-align: center;
	color: ${Colors.DarkRed};
	font-size: 18px;
	margin-top: 40px;
`