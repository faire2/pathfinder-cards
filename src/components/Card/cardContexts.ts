import { standardFFG } from '@/data/cardDimension'
import { bagOfHolding, hornOfBlasting } from '@/data/testCard'
import { createContext } from 'react'

// TODO replace with empty data for loading state etc.
export const CardDataCtx = createContext<CardData>(hornOfBlasting)

export const CardDimensionsCtx = createContext<CardDimensions>(standardFFG)
