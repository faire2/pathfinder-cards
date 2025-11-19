import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

// GET /api/cards - List all cards owned by the authenticated user
export async function GET() {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const cards = await prisma.card.findMany({
			where: {
				userId: session.user.id,
			},
			include: {
				projects: {
					include: {
						project: true, // Include which projects this card is in
					},
				},
			},
			orderBy: {
				updatedAt: 'desc',
			},
		})

		return NextResponse.json(cards, { status: 200 })
	} catch (error) {
		console.error('Error fetching cards:', error)
		return NextResponse.json(
			{ error: 'Failed to fetch cards' },
			{ status: 500 }
		)
	}
}

// POST /api/cards - Create a new card
export async function POST(request: Request) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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
		if (!name) {
			return NextResponse.json(
				{ error: 'Card name is required' },
				{ status: 400 }
			)
		}

		const card = await prisma.card.create({
			data: {
				name,
				type: type || '',
				level: level || '',
				traits: traits || '',
				actions: actions || '',
				body: cardBody || '',
				tags,
				plain: plain ?? 0,
				numberToPrint: numberToPrint ?? 1,
				public: isPublic ?? false,
				url,
				userId: session.user.id,
			},
			include: {
				projects: {
					include: {
						project: true,
					},
				},
			},
		})

		return NextResponse.json(card, { status: 201 })
	} catch (error) {
		console.error('Error creating card:', error)
		return NextResponse.json(
			{ error: 'Failed to create card' },
			{ status: 500 }
		)
	}
}