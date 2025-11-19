import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

// GET /api/cards/[id] - Get a single card
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

		const card = await prisma.card.findUnique({
			where: {
				id,
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
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { id } = await params

		const existingCard = await prisma.card.findUnique({
			where: { id },
		})

		if (!existingCard) {
			return NextResponse.json({ error: 'Card not found' }, { status: 404 })
		}

		if (existingCard.userId !== session.user.id) {
			return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
		}

		const body = await request.json()

		// Build update object with only provided fields (partial updates)
		const updateData: any = {}

		if (body.name !== undefined) {
			if (!body.name) {
				return NextResponse.json(
					{ error: 'Card name cannot be empty' },
					{ status: 400 }
				)
			}
			updateData.name = body.name
		}
		if (body.type !== undefined) updateData.type = body.type
		if (body.level !== undefined) updateData.level = body.level
		if (body.traits !== undefined) updateData.traits = body.traits
		if (body.actions !== undefined) updateData.actions = body.actions
		if (body.body !== undefined) updateData.body = body.body
		if (body.tags !== undefined) updateData.tags = body.tags
		if (body.plain !== undefined) updateData.plain = body.plain
		if (body.numberToPrint !== undefined) updateData.numberToPrint = body.numberToPrint
		if (body.public !== undefined) updateData.public = body.public
		if (body.url !== undefined) updateData.url = body.url

		const card = await prisma.card.update({
			where: {
				id,
			},
			data: updateData,
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
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { id } = await params

		const existingCard = await prisma.card.findUnique({
			where: { id },
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
				id,
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