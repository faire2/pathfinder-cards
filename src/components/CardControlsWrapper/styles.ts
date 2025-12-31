import { cardHoverZoom, doNotPrint } from '@/styles/commonStyles'
import { styled } from 'styled-components'


interface DisabledCard {
	disabled: boolean
}

export const CardWrapper = styled.div<DisabledCard>`
	${cardHoverZoom}
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};

	&:hover {
		opacity: 1;
	}
`

export const ButtonsRow = styled.div`
	${doNotPrint}
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: -15px 0 10px 0;
`
