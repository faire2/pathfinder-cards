import { PrimaryButton } from '@/styles/homePageStyles'

import Card from '../Card'
import * as S from './styles'


interface Props {
	cards: CardData[]
	cardIndex: number
	setCardIndex: (index: number) => void
}

export default function SingleCardView({
	cards,
	cardIndex,
	setCardIndex,
}: Props) {

	const decreaseCardIndex = (): void => setCardIndex(cardIndex - 1)
	const increaseCardIndex = (): void => setCardIndex(cardIndex - 1)

	return (
		<div>
			<Card cardData={cards[cardIndex]} />
			<S.CardControls>
				<PrimaryButton onClick={decreaseCardIndex}>&larr;</PrimaryButton>
				<PrimaryButton onClick={increaseCardIndex}>&rarr;</PrimaryButton>
			</S.CardControls>
		</div>
	)
}
