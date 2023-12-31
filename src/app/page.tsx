'use client'

import { standardFFG } from '@/data/cardDimension'
import { CardDimensionsCtx } from '@/components/Card/cardContexts'
import { useCards } from '@/stores/projectStore'
import Card from '@/components/Card'
import { CardControlWrapper } from '@/components/CardControlsWrapper'

import * as S from './styles'


export default function Home() {
	const cards = useCards()

	return (
		<CardDimensionsCtx.Provider value={standardFFG}>
			<S.Project>
				{cards.map((card, index) => (
					<CardControlWrapper cardIndex={index} key={index}>
						<Card cardData={card} />
					</CardControlWrapper>
				))}
			</S.Project>
		</CardDimensionsCtx.Provider>
	)
}
