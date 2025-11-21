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

export const TwoColumnLayout = styled.div`
	display: flex;
	gap: 40px;
	min-width: 500px;
`

export const Column = styled.div`
	flex: 1;
	min-width: 200px;
`

export const ColumnTitle = styled.h3`
	margin: 0 0 10px 0;
	padding-bottom: 5px;
	border-bottom: 1px solid #d8c384;
`

export const ProjectItem = styled.div`
	padding: 8px;
	cursor: pointer;
	border-radius: 4px;

	&:hover {
		background-color: #f5f0e1;
	}
`

export const EmptyMessage = styled.div`
	color: #888;
	font-style: italic;
	padding: 8px;
`
