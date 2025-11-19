import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

// DELETE /api/projects/[id]/cards/[cardId] - Remove a card from a project
export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ id: string; cardId: string }> }
) {
	try {
		const session = await auth()
		if (!session?.user?.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const { id, cardId } = await params

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

		// Check if the association exists
		const projectCard = await prisma.projectCard.findUnique({
			where: {
				projectId_cardId: {
					projectId: id,
					cardId: cardId,
				},
			},
		})

		if (!projectCard) {
			return NextResponse.json(
				{ error: 'Card is not in this project' },
				{ status: 404 }
			)
		}

		// Delete the association (does NOT delete the card itself)
		await prisma.projectCard.delete({
			where: {
				projectId_cardId: {
					projectId: id,
					cardId: cardId,
				},
			},
		})

		return NextResponse.json(
			{ message: 'Card removed from project successfully' },
			{ status: 200 }
		)
	} catch (error) {
		console.error('Error removing card from project:', error)
		return NextResponse.json(
			{ error: 'Failed to remove card from project' },
			{ status: 500 }
		)
	}
}