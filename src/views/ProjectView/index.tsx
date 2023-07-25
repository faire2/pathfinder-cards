import Card from '@/components/Card'
import * as S from './styles'
import { CardWrapper } from './styles'


interface Props {
	project: Project
	onCardClick: (cardIndex: number) => void
}

export default function ProjectView({ project, onCardClick }: Props) {
	return (
		<S.ProjectView>
			{project.cards.map((card, index) => (
				<CardWrapper onClick={() => onCardClick(index)} key={index}>
					<Card cardData={card} />
				</CardWrapper>
			))}
		</S.ProjectView>
	)
}
