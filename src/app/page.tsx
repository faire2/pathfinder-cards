'use client'

import { useRouter } from 'next/navigation'
import { standardFFG } from '@/data/cardDimension'
import { CardDimensionsCtx } from '@/components/Card/cardContexts'
import {
	useCards,
	useProjectActions,
	useProjectName,
} from '@/stores/projectStore'
import Card from '@/components/Card'
import { Pages } from '@/enums/pages'

import * as S from './styles'


export default function Home() {
	const projectName = useProjectName()
	const cards = useCards()
	const { saveProjectAs } = useProjectActions()
	const router = useRouter()

	return (
		<CardDimensionsCtx.Provider value={standardFFG}>
			<S.Home>
				{cards.map((card, index) => (
					<S.CardWrapper onClick={() => router.push(`${Pages.editCard}/${index}`)} key={index}>
						<Card cardData={card} />
					</S.CardWrapper>
				))}
			</S.Home>
		</CardDimensionsCtx.Provider>
	)
}
