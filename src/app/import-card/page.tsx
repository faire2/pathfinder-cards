import CardEdit from '@/components/CardEdit/CardEdit'
import { emptyCard } from '@/data/emptyCard'


export default function ImportCard() {
	return (
		<CardEdit
			initialCard={emptyCard}
			cardIndex={null}
		/>
	)
}
