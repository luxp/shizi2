// src/api/utils/mongodb.ts
import { MongoClient } from 'mongodb'
var uri =
  process.env.MONGODB_URI || 'mongodb://admin:mylu123654@127.0.0.1:27017'
var dbName = process.env.MONGODB_DB || 'localtest'
var cachedClient
var cachedDb
if (!uri) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}
if (!dbName) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}
async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }
  const client = await MongoClient.connect(uri)
  const db = await client.db(dbName)
  cachedClient = client
  cachedDb = db
  return { client, db }
}

export default async function handler(req, res) {
  const { body } = req
  const { db } = await connectToDatabase()
  const pointsCollection = db.collection('points')
  pointsCollection.insertOne(body)
  console.log(body)
  res.status(200).json({})
}
