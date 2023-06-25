const projectPrefix = 'rpgCards_project_'
const currentProjectNameKey = 'rpgCards_currentProject'

export function saveProject(project: Project) {
	try {
		const serializedData = JSON.stringify(project.cards)
		localStorage.setItem(projectPrefix + project.projectName, serializedData)
	} catch (error) {
		console.error('Error saving cards to local storage:', error)
	}
}

export function loadProject(projectName: string): Project | undefined {
	const storedCards = localStorage.getItem(projectPrefix + projectName)
	if (storedCards) {
		return JSON.parse(storedCards)
	}

	console.error(`Cards could not have been loaded from local storage with ${projectName}.`)
}

export function loadCurrentProjectName(): string | null {
	return localStorage.getItem(currentProjectNameKey)
}

export function saveCurrentProjectName(currentProjectName: string): void {
	try {
		localStorage.setItem(currentProjectNameKey, currentProjectName)
	} catch (error) {
		console.error('Error saving current project name:', error)
	}
}
