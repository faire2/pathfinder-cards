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

export const InputGroup = styled.div`
	margin-top: 10px;
`

export const Input = styled.input`
	border: 1px solid #5d0000;
	width: 100%;
`
export const Label = styled.label`
	color: #5d0000;
	font-size: 90%;
	font-weight: bold;
`
