import * as S from '../styles'

interface Props {
	label: string
	value: string
	inputId?: string
	onChange: (value: string) => void
}

export default function Input({ label, value, inputId, onChange }: Props) {
	const finalId = inputId ?? label

	return (
		<S.InputGroup>
			<S.Label htmlFor={finalId}>{label}</S.Label>
			<S.Input
				id={finalId}
				value={value}
				onChange={(event) => onChange(event.target.value)}
			/>
		</S.InputGroup>
	)
}
