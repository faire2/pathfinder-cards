import Card from '@/components/Card'
import * as S from './styles'


interface Props {
	project: Project
}

export default function ProjectView({ project }: Props) {
	return (
		<S.ProjectView>
			{project.cards.map((card, index) => <Card cardData={card} key={index}/>)}
		</S.ProjectView>
	)
}
