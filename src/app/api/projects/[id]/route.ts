import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

// GET /api/projects/[id] - Get a single project
export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const project = await prisma.project.findUnique({
			where: {
				id: params.id,
			},
			include: {
				cards: {
					include: {
						card: true,
					},
				},
			},
		})

		if (!project) {
			return NextResponse.json({ error: 'Project not found' }, { status: 404 })
		}

		if (project.userId !== session.user.id) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
		}

		return NextResponse.json(project, { status: 200 })
	} catch (error) {
		console.error('Error fetching project:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch project' },
			{ status: 500 }
		)
	}
}

// PUT /api/projects/[id] - Update a project
export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const existingProject = await prisma.project.findUnique({
			where: { id: params.id },
		})

		if (!existingProject) {
			return NextResponse.json({ error: 'Project not found' }, { status: 404 })
		}

		if (existingProject.userId !== session.user.id) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
		}

		const body = await request.json()
		const { projectName } = body

		if (!projectName || typeof projectName !== 'string') {
			return NextResponse.json(
				{ error: 'Project name is required' },
				{ status: 400 }
			)
		}

		const project = await prisma.project.update({
			where: {
				id: params.id,
			},
			data: {
				projectName,
			},
			include: {
				cards: {
					include: {
						card: true,
					},
				},
			},
		})

		return NextResponse.json(project, { status: 200 })
	} catch (error: any) {
		if (error.code === 'P2002') {
			return NextResponse.json(
				{ error: 'A project with this name already exists' },
				{ status: 409 }
			)
		}

		console.error('Error updating project:', error)
		return NextResponse.json(
			{ error: 'Failed to update project' },
			{ status: 500 }
		)
	}
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const existingProject = await prisma.project.findUnique({
			where: { id: params.id },
		})

		if (!existingProject) {
			return NextResponse.json({ error: 'Project not found' }, { status: 404 })
		}

		if (existingProject.userId !== session.user.id) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
		}

		// Delete project (cascade deletes ProjectCard rows, but NOT the cards themselves)
		await prisma.project.delete({
			where: {
				id: params.id,
			},
		})

		return NextResponse.json(
			{ message: 'Project deleted successfully' },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error deleting project:', error)
		return NextResponse.json(
			{ error: 'Failed to delete project' },
			{ status: 500 }
		)
	}
}