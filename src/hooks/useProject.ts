import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { createRequestInit } from '@/api'
import { useCurrentProjectId } from '@/stores/projectStoreV2'

// Type for raw Prisma project response with nested cards
type PrismaProject = Omit<Project, 'cards'> & {
	cards: Array<{ card: CardData }>
}

// Helper to transform Prisma project structure to frontend format
// Prisma returns: { cards: [{ card: CardData }] }
// Frontend expects: { cards: [CardData] }
function transformProject(project: PrismaProject): Project {
	return {
		...project,
		cards: project.cards.map((cardWrapper) => cardWrapper.card)
	}
}

export const projectKeys = {
	all: ['projects'] as const,
	single: (id: string) => ['projects', id] as const,
}

export const dbRoutes = {
	allProjects: '/api/projects' as const,
	singleProject: (projectId: string) => `/api/projects/${projectId}` as const,
	projectCards: (projectId: string) => `/api/projects/${projectId}/cards` as const,
	singleProjectCard: ({ projectId, cardId }: ProjectCardIds) => `/api/projects/${projectId}/cards/${cardId}` as const,
}

export function useAllProjects() {
	return useQuery({
		queryKey: projectKeys.all,
		queryFn: async () => {
			const response = await fetch(dbRoutes.allProjects)
			if (!response.ok) {
				throw new Error('Failed to load all projects')
			}
			const projects = await response.json() as PrismaProject[]
			return projects.map(transformProject)
		}
	})
}

export function useProject(projectId: string) {
	return useQuery({
		queryKey: projectKeys.single(projectId),
		queryFn: async () => {
			const response = await fetch(dbRoutes.singleProject(projectId))
			if (!response.ok) {
				const errorData = await  response.json()
				throw new Error(errorData.error || 'Failed to load project')
			}
			const project = await response.json() as PrismaProject
			return transformProject(project)
		}
	})
}

export function useCreateProject() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (project: Partial<Project> & { projectName: string }) => {
			const response = await fetch(dbRoutes.allProjects, createRequestInit('POST', project))
			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || `Failed to create project ${project.projectName}`)
			}
			const createdProject = await response.json() as PrismaProject
			return transformProject(createdProject)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: projectKeys.all })
		}
	})
}

export function useUpdateProject() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (project: Partial<Project> & { id: string, projectName: string }) => {
			const response = await fetch(dbRoutes.singleProject(project.id), createRequestInit('PUT', project))
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || `Failed to update project ${project.projectName}`)
			}
			const updatedProject = await response.json() as PrismaProject
			return transformProject(updatedProject)
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey:
				projectKeys.all })
			queryClient.invalidateQueries({ queryKey:
					projectKeys.single(variables.id) })
		}
	})
}

export function useDeleteProject() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (projectId: string) => {
			const response = await fetch(dbRoutes.singleProject(projectId), createRequestInit('DELETE'))
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || `Failed to delete project ${projectId}`)
			}
			return
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: projectKeys.all })
		}
	})
}

// Composed hook - combines Zustand UI state with React Query server state
export function useCurrentProject() {
	const currentProjectId = useCurrentProjectId()

	return useQuery({
		queryKey: projectKeys.single(currentProjectId || ''),
		queryFn: async () => {
			if (!currentProjectId) return null

			const response = await fetch(dbRoutes.singleProject(currentProjectId))
			if (!response.ok) {
				const errorData = await response.json()
				throw new Error(errorData.error || 'Failed to load current project')
			}
			const project = await response.json() as PrismaProject
			return transformProject(project)
		},
		enabled: !!currentProjectId,  // Only fetch if we have a project ID
	})
}

interface ProjectCardIds {
	projectId: string
	cardId: string
}

export function useAddCardToProject() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async ({ projectId, cardId }: ProjectCardIds) => {
			const response = await fetch(dbRoutes.projectCards(projectId), createRequestInit('POST', { cardId }))
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || `Failed to add card ${cardId} to project ${projectId}`)
			}
			return
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey:
				projectKeys.all })
			queryClient.invalidateQueries({ queryKey:
					projectKeys.single(variables.projectId) })
		}
	})
}

export function useRemoveCardFromProject() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: async (projectCard: ProjectCardIds) => {
			const response = await fetch(dbRoutes.singleProjectCard(projectCard), createRequestInit('DELETE'))
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || `Failed to remove card ${projectCard.cardId} from project ${projectCard.projectId}`)
			}
			return
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey:
				projectKeys.all })
			queryClient.invalidateQueries({ queryKey:
					projectKeys.single(variables.projectId) })
		}
	})
}
