import { useContext } from 'react'
import { CardDataCtx } from '../cardContexts'
import * as S from '../styles'
import renderEnrichedText from '@/utils/renderCardBody'


export default function CardHeader() {
	const cardData = useContext(CardDataCtx)

	return (
		<S.CardHeader>
			<S.CardName>
				{cardData.name} {renderEnrichedText(cardData.actions)}
			</S.CardName>
			<S.TypeLevel>
				{cardData.type} {cardData.level}
			</S.TypeLevel>
		</S.CardHeader>
	)
}
