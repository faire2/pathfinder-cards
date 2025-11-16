import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

// GET /api/projects - List all projects for the authenticated user
export async function GET() {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const projects = await prisma.project.findMany({
			where: {
				userId: session.user.id,
			},
			include: {
				cards: {
					include: {
						card: true, // Include the actual card data through join table
					},
				},
			},
			orderBy: {
				updatedAt: 'desc',
			},
		})

		return NextResponse.json(projects, { status: 200 })
	} catch (error) {
		console.error('Error fetching projects:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch projects' },
			{ status: 500 }
		)
	}
}

// POST /api/projects - Create a new project
export async function POST(request: Request) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const body = await request.json()
		const { projectName } = body

		if (!projectName || typeof projectName !== 'string') {
			return NextResponse.json(
				{ error: 'Project name is required' },
				{ status: 400 }
			)
		}

		const project = await prisma.project.create({
			data: {
				projectName,
				userId: session.user.id,
			},
			include: {
				cards: {
					include: {
						card: true,
					},
				},
			},
		})

		return NextResponse.json(project, { status: 201 })
	} catch (error: any) {
		if (error.code === 'P2002') {
			return NextResponse.json(
				{ error: 'A project with this name already exists' },
				{ status: 409 }
			)
		}

		console.error('Error creating project:', error)
		return NextResponse.json(
			{ error: 'Failed to create project' },
			{ status: 500 }
		)
	}
}