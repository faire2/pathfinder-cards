'use client'

import { standardFFG } from '@/data/cardDimension'
import { CardDimensionsCtx } from '@/components/Card/cardContexts'
import { useCurrentProject } from '@/stores/projectStoreV2'
import Card from '@/components/Card'
import { CardControlWrapper } from '@/components/CardControlsWrapper'

import * as S from './styles'


export default function Home() {
	const currentProject = useCurrentProject()
	const cards = currentProject?.cards || []

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
