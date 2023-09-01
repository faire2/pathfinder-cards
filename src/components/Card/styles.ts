import { fontGoodCondensed, fontGoodRegular, traitStyle } from '@/styles/commonStyles'
import styled from 'styled-components'

interface StyledBodyProps {
	width: number
}

export const Card = styled.div<CardDimensions>`
	width: ${(props) => props.width}mm;
	height: ${(props) => props.height}mm;
	background-color: antiquewhite;
	padding: ${(props) => props.width / 30}mm;
	font-size: ${(props) => props.width / 25}mm;
	margin: 10px;
	border: 1px solid #e1e1e1;

	@media print {
		margin: 1px;
	}
`

export const Body = styled.div<StyledBodyProps>`
	${fontGoodRegular}
	font-size: 100%;

	display: flex;
	flex-flow: column;
	width: 100%;
	height: 88%;
	overflow: hidden;
	// TODO not working?
	//margin-bottom: ${(props) => props.width * 100}mm;
	margin-top: 2%;
`

export const ElipsisHeadline = styled.h1`
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	margin: 0px;
	// TODO dynamic font-size
`

export const CardName = styled(ElipsisHeadline)`
	display: flex;
	max-width: 75%;
	> div > img {
		height: 12px;
		margin-bottom: 0px;
	}

	> div {
		margin-left: 5px;
	}
`

export const ActionIcon = styled.img`
	height: ${props => props.height}; // TODO change to relative size corresponding to font-size
	margin-bottom: -2px;
`

export const TypeLevel = styled(ElipsisHeadline)`
	max-width: 28%;
`

export const CardHeader = styled.div`
	${fontGoodCondensed}
	font-size: 80%;
	text-transform: uppercase;

	display: flex;
	justify-content: space-between;
	width: 100%;

	border-bottom: 1px solid rgb(119, 119, 119);
	margin-bottom: 2px;
	height: 6%;
`

interface TraitProps {
	width: number
}

export const Traits = styled.div`
	display: flex;
	flex-wrap: wrap;
`

export const Trait = styled.div<TraitProps>`
	${traitStyle}
	padding: ${(props) => props.width / 80}mm ${(props) => props.width / 40}mm;
	padding-top: ${(props) => props.width / 120}mm;
	margin-right: 2px;
`
