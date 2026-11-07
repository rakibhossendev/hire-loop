import { mongodbAdapter } from "@better-auth/mongo-adapter"
import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"

const client = new MongoClient(`${process.env.MONGODB_URL}`)
const db = client.db("hire-loop")
export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ["admin", "seeker", "recruiter"],
        defaultValue: "seeker",
        // Public sign-up may only pick seeker/recruiter — anything else
        // (e.g. "admin" posted via raw API) falls back to the default.
        transform: {
          input: (value) =>
            value === "seeker" || value === "recruiter" ? value : "seeker",
        },
      },
    },
  },
})
