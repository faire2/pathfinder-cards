import { PrimaryButton } from '@/styles/commonComponentStyles'
import styled from 'styled-components'


export const InputGroup = styled.div`
	&:not(:first-child) {
		margin-top: 10px;
	}
`

export const InputLine = styled.div`
	display: flex;
	align-items: baseline;
`

export const Input = styled.input`
	border: 1px solid #5d0000;
	padding: 5px;
`

export const Label = styled.label`
	color: #5d0000;
	font-size: 90%;
	font-weight: bold;
`

export const InputButton = styled(PrimaryButton)`
	margin: 0 10px;
	padding: 5px;
`
