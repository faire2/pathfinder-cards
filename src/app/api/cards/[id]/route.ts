import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

// GET /api/cards/[id] - Get a single card
export async function GET(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const card = await prisma.card.findUnique({
			where: {
				id: params.id,
			},
			include: {
				projects: {
					include: {
						project: true,
					},
				},
			},
		})

		if (!card) {
			return NextResponse.json({ error: 'Card not found' }, { status: 404 })
		}

		if (card.userId !== session.user.id) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
		}

		return NextResponse.json(card, { status: 200 })
	} catch (error) {
		console.error('Error fetching card:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch card' },
			{ status: 500 }
		)
	}
}

// PUT /api/cards/[id] - Update a card
export async function PUT(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const existingCard = await prisma.card.findUnique({
			where: { id: params.id },
		})

		if (!existingCard) {
			return NextResponse.json({ error: 'Card not found' }, { status: 404 })
		}

		if (existingCard.userId !== session.user.id) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
		}

		const body = await request.json()
		const {
			name,
			type,
			level,
			traits,
			actions,
			body: cardBody,
			tags,
			plain,
			numberToPrint,
			public: isPublic,
			url,
		} = body

		// Validate required fields
		if (!name || !type || !level || !traits || !actions || !cardBody) {
			return NextResponse.json(
				{ error: 'Missing required fields: name, type, level, traits, actions, body' },
				{ status: 400 }
			)
		}

		const card = await prisma.card.update({
			where: {
				id: params.id,
			},
			data: {
				name,
				type,
				level,
				traits,
				actions,
				body: cardBody,
				tags,
				plain: plain ?? 0,
				numberToPrint: numberToPrint ?? 1,
				public: isPublic ?? false,
				url,
			},
			include: {
				projects: {
					include: {
						project: true,
					},
				},
			},
		})

		return NextResponse.json(card, { status: 200 })
	} catch (error) {
		console.error('Error updating card:', error)
		return NextResponse.json(
			{ error: 'Failed to update card' },
			{ status: 500 }
		)
	}
}

// DELETE /api/cards/[id] - Delete a card
export async function DELETE(
	request: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const existingCard = await prisma.card.findUnique({
			where: { id: params.id },
		})

		if (!existingCard) {
			return NextResponse.json({ error: 'Card not found' }, { status: 404 })
		}

		if (existingCard.userId !== session.user.id) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
		}

		// Delete card (cascade deletes all ProjectCard associations)
		await prisma.card.delete({
			where: {
				id: params.id,
			},
		})

		return NextResponse.json(
			{ message: 'Card deleted successfully' },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error deleting card:', error)
		return NextResponse.json(
			{ error: 'Failed to delete card' },
			{ status: 500 }
		)
	}
}