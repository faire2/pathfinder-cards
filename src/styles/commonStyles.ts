import { createGlobalStyle, css, styled } from 'styled-components'

export const FlexRow = styled.div`
	display: flex;
`

export const doNotPrint = css`
	@media print {
		display: none;
	}
`

export const fontGoodRegular = css`
	font-family: 'goodProRegular', 'Arial', sans-serif;
`

export const fontGoodCondensed = css`
	font-family: 'goodCondensedMedium', 'Arial', sans-serif;
`

export const fontgoodCondensedBold = css`
	font-family: 'goodCondensedBold', 'Arial', sans-serif;
`

export const GlobalStyle = createGlobalStyle`
	body {
		${fontGoodRegular}
	}

	@page {
		margin: 50cm;
	}

`

export const traitStyle = css`
	${fontGoodCondensed}
	font-size: 100%;
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
