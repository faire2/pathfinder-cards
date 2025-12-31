'use client'

import { useState } from 'react'
import { useAllProjects, useDeleteProject, useUpdateProject } from '@/hooks/useProject'
import { useSetCurrentProjectId, useCurrentProjectId } from '@/stores/projectStoreV2'
import { standardFFG } from '@/data/cardDimension'
import { CardDimensionsCtx } from '@/components/Card/cardContexts'
import Card from '@/components/Card'
import SpinnerButton from '@/components/SpinnerButton'
import * as S from './styles'

function projectToCardData(project: Project): CardData {
	const sortedCardNames = project.cards
		.map(card => card.name)
		.sort((a, b) => a.localeCompare(b))
		.join(', ')

	const cardCount = project.cards.length
	const cardWord = cardCount === 1 ? 'card' : 'cards'

	return {
		id: project.id,
		name: project.projectName,
		type: '',
		level: `${cardCount} ${cardWord}`,
		traits: '',
		actions: '',
		body: sortedCardNames || 'No cards yet',
		numberToPrint: 0,
	}
}

export default function ProjectsPage() {
	const { data: projects, isLoading } = useAllProjects()
	const deleteProject = useDeleteProject()
	const updateProject = useUpdateProject()
	const setCurrentProjectId = useSetCurrentProjectId()
	const currentProjectId = useCurrentProjectId()
	const [loadingProjectId, setLoadingProjectId] = useState<string | null>(null)
	const [loadingAction, setLoadingAction] = useState<'rename' | 'delete' | null>(null)

	const handleSwitchToProject = (projectId: string) => {
		setCurrentProjectId(projectId)
	}

	const handleRenameProject = (projectId: string, currentName: string) => {
		const newName = prompt('Enter new project name:', currentName)
		if (newName && newName !== currentName) {
			setLoadingProjectId(projectId)
			setLoadingAction('rename')
			updateProject.mutate({ id: projectId, projectName: newName }, {
				onSettled: () => {
					setLoadingProjectId(null)
					setLoadingAction(null)
				}
			})
		}
	}

	const handleDeleteProject = (projectId: string, projectName: string) => {
		if (confirm(`Are you sure you want to delete "${projectName}"?`)) {
			setLoadingProjectId(projectId)
			setLoadingAction('delete')
			deleteProject.mutate(projectId, {
				onSettled: () => {
					setLoadingProjectId(null)
					setLoadingAction(null)
				}
			})
		}
	}

	if (isLoading) {
		return (
			<S.PageContainer>
				<S.EmptyMessage>Loading...</S.EmptyMessage>
			</S.PageContainer>
		)
	}

	return (
		<CardDimensionsCtx.Provider value={standardFFG}>
			<S.PageContainer>
				{projects?.length ? (
					<S.CardGrid>
						{projects.map((project) => {
							const isCurrentProject = project.id === currentProjectId
							return (
								<S.CardItem key={project.id}>
									<S.CardWrapper
										$isActive={isCurrentProject}
										onClick={() => handleSwitchToProject(project.id)}
									>
										<Card cardData={projectToCardData(project)} />
									</S.CardWrapper>
									<S.CardActions>
										<SpinnerButton
											onClick={(e) => {
												e.stopPropagation()
												handleRenameProject(project.id, project.projectName)
											}}
											isLoading={loadingProjectId === project.id && loadingAction === 'rename'}
											disabled={loadingProjectId !== null}
										>
											Rename
										</SpinnerButton>
										<SpinnerButton
											onClick={(e) => {
												e.stopPropagation()
												handleDeleteProject(project.id, project.projectName)
											}}
											isLoading={loadingProjectId === project.id && loadingAction === 'delete'}
											disabled={loadingProjectId !== null}
										>
											Delete
										</SpinnerButton>
									</S.CardActions>
								</S.CardItem>
							)
						})}
					</S.CardGrid>
				) : (
					<S.EmptyMessage>No projects yet</S.EmptyMessage>
				)}
			</S.PageContainer>
		</CardDimensionsCtx.Provider>
	)
}