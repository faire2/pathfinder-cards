import { PrimaryButton } from '@/styles/homePageStyles'
import styled from 'styled-components'


interface CardWidth {
	width: number
}

export const CardEdit = styled.div<CardWidth>`
	width: ${(props) => props.width}mm;
`

export const TextArea = styled.textarea`
	width: 99%;
	margin-top: 10px;
	height: 400px;
`
