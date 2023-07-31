import { useContext } from 'react'

import renderEnrichedText from '@/utils/renderCardBody'
import { CardDataCtx, CardDimensionsCtx } from '../cardContexts'
import * as S from '../styles'


export default function Body() {
	const { body } = useContext(CardDataCtx)
	const { width } = useContext(CardDimensionsCtx)

	return (
		<S.Body width={width}>{renderEnrichedText(body, width)}</S.Body>
	)
}
