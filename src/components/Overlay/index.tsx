import { useState } from 'react'
import { Label, OverlayWrapper } from '@/styles/commonStyledComponents'

import Input from '../Input'
import * as S from './styles'
import { useOverlayActions, useOverlayData } from '@/stores/overlayStore'


export default function Overlay() {
	const [inputValue, setInputValue] = useState('')
	const { hideOverlay } = useOverlayActions()
	const { label, data, overlayType, onFinish } = useOverlayData()

	const handleOnClick = (value: string): void => {
		if (!!onFinish) {
			onFinish(value)
			hideOverlay()
		} else {
			console.error('Null function encountered in Overlay')
		}
	}


	return (
		<OverlayWrapper>
			<S.InputWrapper>
				{label && <Label>{label}</Label>}
				{overlayType === 'input' ? (
					<Input
						value={inputValue}
						buttonText="OK"
						onChange={setInputValue}
						onButtonClick={() => handleOnClick(inputValue)}
					/>
				) : overlayType === 'listChoice' ? (
					(data as string[]).map((value, index) => (
						<div key={index} onClick={() => handleOnClick(value)}>
							{value}
						</div>
					))
				) : (
					''
				)}
			</S.InputWrapper>
		</OverlayWrapper>
	)
}
