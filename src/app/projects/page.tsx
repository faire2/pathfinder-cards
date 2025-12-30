'use client'

import { useState } from 'react'
import { useAllProjects, useDeleteProject } from '@/hooks/useProject'
import { useSetCurrentProjectId, useCurrentProjectId } from '@/stores/projectStoreV2'
import { PrimaryButton } from '@/styles/commonStyledComponents'
import SpinnerButton from '@/components/SpinnerButton'
import * as S from './styles'

export default function ProjectsPage() {
	const { data: projects, isLoading } = useAllProjects()
	const deleteProject = useDeleteProject()
	const setCurrentProjectId = useSetCurrentProjectId()
	const currentProjectId = useCurrentProjectId()
	const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null)

	const handleSwitchToProject = (projectId: string) => {
		setCurrentProjectId(projectId)
	}

	const handleDeleteProject = (projectId: string, projectName: string) => {
		if (confirm(`Are you sure you want to delete "${projectName}"?`)) {
			setDeletingProjectId(projectId)
			deleteProject.mutate(projectId, {
				onSettled: () => {
					setDeletingProjectId(null)
				}
			})
		}
	}

	if (isLoading) {
		return (
			<S.PageContainer>
				<S.PageTitle>Projects</S.PageTitle>
				<S.EmptyMessage>Loading...</S.EmptyMessage>
			</S.PageContainer>
		)
	}

	return (
		<S.PageContainer>
			<S.PageTitle>Projects</S.PageTitle>
			{projects?.length ? (
				<S.ProjectList>
					{projects.map((project) => (
						<S.ProjectRow key={project.id}>
							<S.ProjectName>
								{project.projectName} ({project.cards.length} cards)
								{project.id === currentProjectId && ' - Current'}
							</S.ProjectName>
							<S.ProjectActions>
								<PrimaryButton
									onClick={() => handleSwitchToProject(project.id)}
									disabled={project.id === currentProjectId}
								>
									Switch to project
								</PrimaryButton>
								<SpinnerButton
									onClick={() => handleDeleteProject(project.id, project.projectName)}
									isLoading={deletingProjectId === project.id}
									disabled={deletingProjectId !== null}
								>
									Delete project
								</SpinnerButton>
							</S.ProjectActions>
						</S.ProjectRow>
					))}
				</S.ProjectList>
			) : (
				<S.EmptyMessage>No projects yet</S.EmptyMessage>
			)}
		</S.PageContainer>
	)
}