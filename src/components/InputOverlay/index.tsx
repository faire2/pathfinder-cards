import { useState } from 'react'
import { Overlay } from '@/styles/commonStyledComponents'

import Input from '../Input'
import * as S from './styles'


export default function InputOverlay({ inputLabel, onClick }: OverlayData) {
	const [inputValue, setInputValue] = useState('')
	return (
		<Overlay>
			<S.InputWrapper>
				<Input
					label={inputLabel}
					value={inputValue}
					buttonText="OK"
					onChange={setInputValue}
					onButtonClick={() => onClick(inputValue)}
				/>
			</S.InputWrapper>
		</Overlay>
	)
}
