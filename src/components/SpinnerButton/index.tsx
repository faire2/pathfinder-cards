'use client'

import { ButtonHTMLAttributes } from 'react'
import styled, { keyframes } from 'styled-components'
import { traitStyle } from '@/styles/commonStyles'

const spin = keyframes`
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
`

const Spinner = styled.span`
	display: inline-block;
	width: 14px;
	height: 14px;
	border: 2px solid transparent;
	border-top-color: #fff;
	border-radius: 50%;
	animation: ${spin} 0.8s linear infinite;
	vertical-align: middle;
`

const ButtonContent = styled.span`
	display: inline-block;
	vertical-align: middle;
`

const StyledButton = styled.button`
	${traitStyle}
	padding: 5px;
	margin: 10px;
	cursor: pointer;
	transition: all 0.3s;
	text-decoration: none;
	min-width: 80px;

	&:disabled {
		cursor: not-allowed;
		opacity: 0.7;
	}

	&:hover:not(:disabled) {
		opacity: 0.7;
	}
`

interface SpinnerButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading?: boolean
	children: React.ReactNode
}

export default function SpinnerButton({ isLoading, children, disabled, ...props }: SpinnerButtonProps) {
	return (
		<StyledButton disabled={isLoading || disabled} {...props}>
			{isLoading ? <Spinner /> : <ButtonContent>{children}</ButtonContent>}
		</StyledButton>
	)
}