import { useState } from 'react'
import { Label, OverlayWrapper } from '@/styles/commonStyledComponents'

import Input from '../Input'
import * as S from './styles'


export default function Overlay({
	overlay,
	label,
	data,
	hideOverlay,
	onFinish,
}: OverlayData) {
	const [inputValue, setInputValue] = useState('')

	const handleOnClick = (value: string): void => {
		console.log(value)
		onFinish(value)
		hideOverlay()
	}

	return (
		<OverlayWrapper>
			<S.InputWrapper>
				{label && <Label>{label}</Label>}
				{overlay === 'inputData' ? (
					<Input
						value={inputValue}
						buttonText="OK"
						onChange={setInputValue}
						onButtonClick={() => handleOnClick(inputValue)}
					/>
				) : overlay === 'listChoice' ? (
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
