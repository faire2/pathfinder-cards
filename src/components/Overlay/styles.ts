import { Colors } from '@/styles/commonStyles'
import { styled } from 'styled-components'

export const InputWrapper = styled.div`
	position: relative;
	top: -20%;
	background-color: white;
	padding: 10px;
	box-shadow: grey 0px 5px 10px;
	border: 2px solid #d8c384;
`

export const Header = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`

export const CancelButton = styled.div`
	color: ${Colors.DarkRed};
	width: 20px;
	height: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	&::before {
		content: '×';
	}
`
