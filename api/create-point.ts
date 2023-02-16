import type { VercelRequest, VercelResponse } from '@vercel/node'
import { connectToDatabase } from './utils/mongodb'
import type { Point } from '../types'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { body } = req
  const { db } = await connectToDatabase()

  const pointsCollection = db.collection('points')

  pointsCollection.insertOne(body)

  console.log(body)
  res.status(200).json({})
}
