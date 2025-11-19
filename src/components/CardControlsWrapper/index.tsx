import { useRouter } from 'next/navigation'
import { Pages } from '@/enums/pages'
import { useProjectActionsV2, useCurrentProject } from '@/stores/projectStoreV2'
import {
	FlexColumn,
	FlexRow,
	PrimaryButton,
	PrimaryButtonRound,
} from '@/styles/commonStyledComponents'
import { isNumber } from '@/utils/utils'

import * as S from './styles'

interface Props {
	cardIndex: number
	children: React.ReactNode
}

export const CardControlWrapper = ({ cardIndex, children }: Props) => {
	const router = useRouter()
	const { updateCard, removeCardFromProject } = useProjectActionsV2()
	const currentProject = useCurrentProject()
	const card = currentProject?.cards?.[cardIndex]
	const numberToPrint = card?.numberToPrint || 0

	const handleIncreaseNumber = async () => {
		if (!card) return

		/* Originally projects did not have number of cards to print. If that
		is the case here, let's follow user's most likely intent and increase
		the number of prints to 1. */
		const finalNumber = isNumber(numberToPrint) ? numberToPrint + 1 : 1
		await updateCard(card.id, { numberToPrint: finalNumber })
	}

	const handleDecreaseNumber = async () => {
		if (!card) return

		/* See previous note, this time the most probable intent is to not
		print the card. */
		const finalNumber = !isNumber(numberToPrint)
			? 0
			: numberToPrint > 0
				? numberToPrint - 1
				: 0
		await updateCard(card.id, { numberToPrint: finalNumber })
	}

	const handleRemoveFromProject = async () => {
		if (!card || !currentProject) return
		await removeCardFromProject(currentProject.id, card.id)
	}

	return (
		<FlexColumn>
			<S.CardWrapper
				disabled={!numberToPrint}
				onClick={() => router.push(`${Pages.editCard}/${cardIndex}`)}
			>
				{children}
			</S.CardWrapper>
			<S.ButtonsRow>
				<FlexRow>
					<PrimaryButtonRound
						title={'Increase number of cards to print'}
						onClick={handleIncreaseNumber}
					>
						+
					</PrimaryButtonRound>
					{numberToPrint}
					<PrimaryButtonRound
						title={'Decrease number of cards to print'}
						onClick={handleDecreaseNumber}
					>
						-
					</PrimaryButtonRound>
				</FlexRow>
				<PrimaryButton
					title="Remove card from this project"
					onClick={handleRemoveFromProject}
				>
					Remove
				</PrimaryButton>
			</S.ButtonsRow>
		</FlexColumn>
	)
}
