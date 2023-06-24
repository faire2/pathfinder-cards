import Card from '@/components/Card'
import { saphireSpells } from '@/data/spells'
import * as S from './styles'

interface Props {
	cards: CardData[]
}

export default function PrintPage({ cards }: Props) {
	return (
		<S.PrintPage>
			{saphireSpells.map((cardData, index) => (
				<Card cardData={cardData} key={index} />
			))}
		</S.PrintPage>
	)
}
