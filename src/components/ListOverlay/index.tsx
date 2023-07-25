import { OverlayWrapper } from '@/styles/commonStyledComponents'

import * as S from './styles'


export default function ListOverlay(
	{ items, onClick }: OverlayListChoiceData
) {
	return (
		<OverlayWrapper>
			<S.InputWrapper>
				{items.map((item, index) => (
					<div key={index} onClick={() => onClick(item)}>
						{item}
					</div>
				))}
			</S.InputWrapper>
		</OverlayWrapper>
	)
}
