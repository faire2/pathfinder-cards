'use client'

import { useContext } from 'react'

import { CardDataCtx, CardDimensionsCtx } from './cardContexts'
import CardHeader from './components/CardHeader'
import Traits from './components/Traits'
import Body from './components/Body'
import * as S from './styles'

interface Props {
	cardData: CardData
}

export default function Card({ cardData }: Props) {
	const { width, height } = useContext(CardDimensionsCtx)

	return (
		<CardDataCtx.Provider value={cardData}>
			<S.Card width={width} height={height}>
				<CardHeader />
				<Traits />
				<Body />
			</S.Card>
		</CardDataCtx.Provider>
	)
}
