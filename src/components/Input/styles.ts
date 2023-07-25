import { PrimaryButton } from '@/styles/commonStyledComponents'
import styled from 'styled-components'


export const InputGroup = styled.div`
	&:not(:first-child) {
		margin-top: 10px;
	}
	width: 300px
`

export const InputLine = styled.div`
	display: flex;
	align-items: baseline;
`

export const Input = styled.input`
	border: 1px solid #5d0000;
	padding: 5px;
	width: 100%
`

export const InputButton = styled(PrimaryButton)`
	margin: 0 10px;
	padding: 5px;
`
