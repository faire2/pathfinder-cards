import { useContext } from 'react'
import { CardDataCtx, CardDimensionsCtx } from '../cardContexts'
import * as S from '../styles'

export default function Traits() {
	const { traits } = useContext(CardDataCtx)

	const styledTraits = traits
		? traits.split(',').map((trait, index) => <Trait trait={trait} key={index} />)
		: null

	return <S.Traits>{styledTraits}</S.Traits>
}



function Trait({ trait }: { trait: string }) {
	const { width } = useContext(CardDimensionsCtx)

	return <S.Trait width={width}>{trait}</S.Trait>
}
