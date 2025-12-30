'use client'

import { useAllProjects, useDeleteProject } from '@/hooks/useProject'
import { useSetCurrentProjectId, useCurrentProjectId } from '@/stores/projectStoreV2'
import { PrimaryButton } from '@/styles/commonStyledComponents'
import * as S from './styles'

export default function ProjectsPage() {
	const { data: projects, isLoading } = useAllProjects()
	const deleteProject = useDeleteProject()
	const setCurrentProjectId = useSetCurrentProjectId()
	const currentProjectId = useCurrentProjectId()

	const handleSwitchToProject = (projectId: string) => {
		setCurrentProjectId(projectId)
	}

	const handleDeleteProject = (projectId: string, projectName: string) => {
		if (confirm(`Are you sure you want to delete "${projectName}"?`)) {
			deleteProject.mutate(projectId)
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
								<PrimaryButton
									onClick={() => handleDeleteProject(project.id, project.projectName)}
								>
									Delete project
								</PrimaryButton>
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