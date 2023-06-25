'use client'

import { useContext } from 'react'

import { CardDataCtx, CardDimensionsCtx } from './cardContexts'
import CardHeader from './components/CardHeader'
import Traits from './components/Traits'
import Body from './components/Body'
import * as S from './styles'


interface Props {
	cardData: CardData | undefined
}

export default function Card({ cardData }: Props) {
	const { width, height } = useContext(CardDimensionsCtx)

	return (
		<S.Card width={width} height={height}>
			{cardData && (
				<CardDataCtx.Provider value={cardData}>
					<CardHeader />
					<Traits />
					<Body />
				</CardDataCtx.Provider>
			)}
		</S.Card>
	)
}
