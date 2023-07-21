import * as S from './styles'

interface Props {
	label: string
	value: string
	inputId?: string
	buttonText?: string
	onChange: (value: string) => void
	onButtonClick?: () => void
}

export default function Input({
	label,
	value,
	inputId,
	buttonText,
	onChange,
	onButtonClick,
}: Props) {
	const finalId = inputId ?? label

	return (
		<S.InputGroup>
			<S.Label htmlFor={finalId}>{label}</S.Label>
			<S.InputLine>
				<S.Input
					id={finalId}
					value={value}
					onChange={(event) => onChange(event.target.value)}
				/>
				{buttonText && (
					<S.InputButton
						disabled={!value}
						onClick={onButtonClick}
					>
						{buttonText}
					</S.InputButton>
				)}
			</S.InputLine>
		</S.InputGroup>
	)
}
