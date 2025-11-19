import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

// GET /api/projects/[id]/cards - List all cards in a project
export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { id } = await params

		const project = await prisma.project.findUnique({
			where: { id },
		})

		if (!project) {
			return NextResponse.json({ error: 'Project not found' }, { status: 404 })
		}

		if (project.userId !== session.user.id) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
		}

		const projectCards = await prisma.projectCard.findMany({
			where: {
				projectId: id,
			},
			include: {
				card: true,
			},
			orderBy: {
				addedAt: 'desc',
			},
		})

		// Extract just the cards from the join table results
		const cards = projectCards.map((pc) => pc.card)

		return NextResponse.json(cards, { status: 200 })
	} catch (error) {
		console.error('Error fetching cards:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch cards' },
			{ status: 500 }
		)
	}
}

// POST /api/projects/[id]/cards - Add an existing card to a project
export async function POST(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { id } = await params

		// Verify project exists and user owns it
		const project = await prisma.project.findUnique({
			where: { id },
		})

		if (!project) {
			return NextResponse.json({ error: 'Project not found' }, { status: 404 })
		}

		if (project.userId !== session.user.id) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
		}

		const body = await request.json()
		const { cardId } = body

		if (!cardId || typeof cardId !== 'string') {
			return NextResponse.json(
				{ error: 'Card ID is required' },
				{ status: 400 }
			)
		}

		// Verify card exists and user owns it
		const card = await prisma.card.findUnique({
			where: { id: cardId },
		})

		if (!card) {
			return NextResponse.json({ error: 'Card not found' }, { status: 404 })
		}

		if (card.userId !== session.user.id) {
			return NextResponse.json(
				{ error: 'You can only add your own cards to projects' },
				{ status: 403 }
			)
		}

		// Create the association (will fail if already exists due to composite key)
		const projectCard = await prisma.projectCard.create({
			data: {
				projectId: id,
				cardId: cardId,
			},
			include: {
				card: true,
			},
		})

		return NextResponse.json(projectCard.card, { status: 201 })
	} catch (error: any) {
		if (error.code === 'P2002') {
			return NextResponse.json(
				{ error: 'Card is already in this project' },
				{ status: 409 }
			)
		}

		console.error('Error adding card to project:', error)
		return NextResponse.json(
			{ error: 'Failed to add card to project' },
			{ status: 500 }
		)
	}
}