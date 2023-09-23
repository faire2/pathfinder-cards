import { doNotPrint } from '@/styles/commonStyles'
import { styled } from 'styled-components'


interface DisabledCard {
	disabled: boolean
}

export const CardWrapper = styled.div<DisabledCard>`
	cursor: pointer;
	transition: all 1s;
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
	transform-origin: center bottom;

	&:hover {
		transform: scale(120%);
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
