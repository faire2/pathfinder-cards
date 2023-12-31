import { useRouter } from 'next/navigation'
import { Pages } from '@/enums/pages'
import { useProjectActions, useNumberToPrint } from '@/stores/projectStore'
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
	const { changeNumberToPrint, removeCardByIndex } =
		useProjectActions()
	const numberToPrint = useNumberToPrint(cardIndex)

	const handleIncreaseNumber = () => {
		/* Originally projects did not have number of cards to print. If that
		is the case here, let's follow user's most likely intent and increase
		the number of prints to 1. */
		const finalNumber = isNumber(numberToPrint) ? numberToPrint + 1 : 1
		changeNumberToPrint(cardIndex, finalNumber)
	}

	const handleDecreaseNumber = () => {
		/* See previous note, this time the most probable intent is to not
		print the card. */
		const finalNumber = !isNumber(numberToPrint)
			? 0
			: numberToPrint > 0
				? numberToPrint - 1
				: 0
		changeNumberToPrint(cardIndex, finalNumber)
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
					title="Delete this card"
					onClick={() => removeCardByIndex(cardIndex)}
				>
					Delete
				</PrimaryButton>
			</S.ButtonsRow>
		</FlexColumn>
	)
}
