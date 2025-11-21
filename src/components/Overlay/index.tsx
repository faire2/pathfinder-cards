'use client'

import { useState, useEffect } from 'react'
import { CancelButton, Label, OverlayWrapper } from '@/styles/commonStyledComponents'

import Input from '../Input'
import * as S from './styles'
import { useOverlayActions, useOverlayData, getLocalStorageProjectNames } from '@/stores/overlayStore'
import { useAllProjects, useImportProjectFromLocalStorage } from '@/hooks/useProject'
import { useSetCurrentProjectId } from '@/stores/projectStoreV2'
import { loadProjectFromLs } from '@/utils/localStorage'


export default function Overlay() {
	const [inputValue, setInputValue] = useState('')
	const [lsProjectNames, setLsProjectNames] = useState<string[]>([])
	const { hideOverlay } = useOverlayActions()
	const { label, data, overlayType, onFinish } = useOverlayData()
	const { data: dbProjects } = useAllProjects()
	const setCurrentProjectId = useSetCurrentProjectId()
	const importMutation = useImportProjectFromLocalStorage()

	// Load localStorage projects on mount
	useEffect(() => {
		setLsProjectNames(getLocalStorageProjectNames())
	}, [])

	const handleOnClick = (value: string): void => {
		if (!!onFinish) {
			onFinish(value)
			hideOverlay()
		} else {
			console.error('Null function encountered in Overlay')
		}
	}

	const handleSelectDbProject = (projectId: string) => {
		setCurrentProjectId(projectId)
		hideOverlay()
	}

	const handleImportFromLs = (projectName: string) => {
		const project = loadProjectFromLs(projectName)
		if (project) {
			importMutation.mutate(project, {
				onSuccess: (importedProject) => {
					setCurrentProjectId(importedProject.id)
					hideOverlay()
				}
			})
		}
	}

	return (
		<OverlayWrapper>
			<S.InputWrapper>
				<S.Header>
					{label && <Label>{label}</Label>}
					<CancelButton onClick={hideOverlay} />
				</S.Header>
				{overlayType === 'input' ? (
					<Input
						value={inputValue}
						buttonText="OK"
						onChange={setInputValue}
						onButtonClick={() => handleOnClick(inputValue)}
					/>
				) : overlayType === 'listChoice' ? (
					(data as string[]).map((value, index) => (
						<div key={index} onClick={() => handleOnClick(value)}>
							{value}
						</div>
					))
				) : overlayType === 'projectSwitcher' ? (
					<S.TwoColumnLayout>
						<S.Column>
							<S.ColumnTitle>Load Project</S.ColumnTitle>
							{dbProjects?.length ? (
								dbProjects.map((project) => (
									<S.ProjectItem key={project.id} onClick={() => handleSelectDbProject(project.id)}>
										{project.projectName}
									</S.ProjectItem>
								))
							) : (
								<S.EmptyMessage>No projects yet</S.EmptyMessage>
							)}
						</S.Column>
						<S.Column>
							<S.ColumnTitle>Import from Local Storage</S.ColumnTitle>
							{lsProjectNames.length ? (
								lsProjectNames.map((name, index) => (
									<S.ProjectItem key={index} onClick={() => handleImportFromLs(name)}>
										{name}
									</S.ProjectItem>
								))
							) : (
								<S.EmptyMessage>No local projects found</S.EmptyMessage>
							)}
						</S.Column>
					</S.TwoColumnLayout>
				) : (
					''
				)}
			</S.InputWrapper>
		</OverlayWrapper>
	)
}
