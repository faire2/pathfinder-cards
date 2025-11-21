import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import {createRequestInit} from "@/api";
import { projectKeys } from './useProject'

export const cardKeys = {
	all: ['cards'] as const,
	detail: (id: string) => ['cards', id] as const,
}

export const dbRoutes = {
	cards: '/api/cards' as const,
	card: (cardId: string) => `/api/cards/${cardId}` as const,
}

export function useCardLibrary() {
	return useQuery({
		queryKey: cardKeys.all,
		queryFn: async () => {
			const response = await fetch(dbRoutes.cards)
			if (!response.ok) {
				throw new Error('Failed to load card library')
			}
			return response.json() as Promise<CardData[]>
		}
	})
}

export function useCreateCard() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (cardData: Omit<CardData, 'id'>) => {
			const response = await fetch(dbRoutes.cards, createRequestInit('POST', cardData))
			if (!response.ok) {
				const errorData = await  response.json()
				throw new Error(errorData.error || 'Failed to create card')
			}
			return response.json() as Promise<CardData>
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: cardKeys.all })
		}
	})
}

export function useUpdateCard() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (cardData: Partial<CardData> & {'id': string}) => {
			const response = await fetch(dbRoutes.card(cardData.id), createRequestInit('PUT', cardData))
			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || `Failed to update card ${cardData.id} - ${cardData.name}`)
			}
			return response.json() as Promise<CardData>
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: cardKeys.all })
			queryClient.invalidateQueries({ queryKey: projectKeys.all })
		}
	})
}

export function useDeleteCard() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (cardId: string) => {
			const response = await fetch(dbRoutes.card(cardId), createRequestInit('DELETE'))
			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || `Failed to delete card ${cardId}`)
			}
			return
		},
		onSuccess: () => {
			// Invalidate both card library and all projects (since card was in projects)
			queryClient.invalidateQueries({ queryKey: cardKeys.all })
			queryClient.invalidateQueries({ queryKey: projectKeys.all })
		}
	})
}