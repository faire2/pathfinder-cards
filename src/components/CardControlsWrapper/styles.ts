import { doNotPrint } from '@/styles/commonStyles'
import { styled } from 'styled-components'


interface DisabledCard {
	disabled: boolean
}

export const CardWrapper = styled.div<DisabledCard>`
	cursor: pointer;
	transition: all 1s;
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};

	&:hover {
		transform: scale(120%);
	}
`

export const ButtonsRow = styled.div`
	${doNotPrint}
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	margin: -5px 0 10px 0;
`
