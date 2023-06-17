interface Props {
	cardData: CardData
}

export default function Card({ cardData }: Props) {
	return (
		<div>{cardData.name}</div>
	)
}
