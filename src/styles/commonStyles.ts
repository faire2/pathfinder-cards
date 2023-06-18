import { createGlobalStyle, css, styled } from 'styled-components'

export const FlexRow = styled.div`
	display: flex;
`

export const doNotPrint = css`
	@media print {
		display: none;
	}
`

export const GlobalStyle = createGlobalStyle`
	@page {
		margin: 50cm;
	}

`

export const traitStyle = css`
	font-size: 100%;
	font-family: 'goodCondensedMedium', 'Arial', sans-serif;
	text-transform: uppercase;
	line-height: 1;
	font-weight: bold;
	letter-spacing: 0.05rem;
	color: #fff;
	text-shadow: 0 0 0 #fff;
	text-align: center;
	background: #5d0000;
	border: 2px solid #d8c384;
`
