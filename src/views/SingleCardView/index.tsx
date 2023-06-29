import Card from '@/components/Card'
import * as S from './styles'
import { PrimaryButton } from '@/styles/commonComponentStyles'


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
