import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"

const client = new MongoClient(`${process.env.MONGODB_URL}`)
const db = client.db("hire-loop")
export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
})
