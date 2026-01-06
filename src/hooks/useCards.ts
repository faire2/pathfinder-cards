import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { createRequestInit } from '@/api'
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

type UpdateCardVariables = Partial<CardData> & { id: string; projectId?: string }

export function useUpdateCard() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (cardData: UpdateCardVariables) => {
			const response = await fetch(dbRoutes.card(cardData.id), createRequestInit('PUT', cardData))
			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || `Failed to update card ${cardData.id} - ${cardData.name}`)
			}
			return response.json() as Promise<CardData>
		},
		onMutate: async (newCardData) => {
			// Cancel any outgoing refetches to avoid overwriting optimistic update
			await queryClient.cancelQueries({ queryKey: cardKeys.all })
			if (newCardData.projectId) {
				await queryClient.cancelQueries({ queryKey: projectKeys.single(newCardData.projectId) })
			}

			// Snapshot previous values for rollback
			const previousCards = queryClient.getQueryData<CardData[]>(cardKeys.all)
			const previousProject = newCardData.projectId
				? queryClient.getQueryData<Project>(projectKeys.single(newCardData.projectId))
				: undefined

			// Optimistically update card library
			if (previousCards) {
				queryClient.setQueryData<CardData[]>(cardKeys.all, (old) =>
					old?.map((card) =>
						card.id === newCardData.id ? { ...card, ...newCardData } : card
					)
				)
			}

			// Optimistically update project's cards
			if (previousProject && newCardData.projectId) {
				queryClient.setQueryData<Project>(projectKeys.single(newCardData.projectId), (old) => {
					if (!old) return old
					return {
						...old,
						cards: old.cards.map((card) =>
							card.id === newCardData.id ? { ...card, ...newCardData } : card
						),
					}
				})
			}

			return { previousCards, previousProject, projectId: newCardData.projectId }
		},
		onError: (_err, _newCardData, context) => {
			// Roll back to previous state on error
			if (context?.previousCards) {
				queryClient.setQueryData(cardKeys.all, context.previousCards)
			}
			if (context?.previousProject && context?.projectId) {
				queryClient.setQueryData(projectKeys.single(context.projectId), context.previousProject)
			}
		},
		onSettled: (_data, _error, variables) => {
			// Always refetch after mutation settles to ensure server state is in sync
			queryClient.invalidateQueries({ queryKey: cardKeys.all })
			if (variables.projectId) {
				queryClient.invalidateQueries({ queryKey: projectKeys.single(variables.projectId) })
			}
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