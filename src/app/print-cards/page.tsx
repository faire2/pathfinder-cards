'use client'

import { standardFFG } from '@/data/cardDimension'
import { CardDimensionsCtx } from '@/components/Card/cardContexts'
import { useCurrentProject } from '@/hooks/useProject'
import Card from '@/components/Card'

import * as S from './styles'

export default function Home() {
	const { data: currentProject } = useCurrentProject()
	const cards = currentProject?.cards || []
	const cardsToPrint = cards.reduce<CardData[]>((collection, card) => {
		for (let i = 0; i < card.numberToPrint; i++) {
			collection.push(card)
		}

		return collection
	}, [])

	return (
		<CardDimensionsCtx.Provider value={standardFFG}>
			<S.PrintView>
				{cardsToPrint.map((card, index) => (
					<Card cardData={card} key={index} />
				))}
			</S.PrintView>
		</CardDimensionsCtx.Provider>
	)
}
