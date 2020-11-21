import mysql from "mysql"
import dotenv from "dotenv"

//Get .env file path
dotenv.config({ path: "./.env" })

const conn = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
})

export const addNewGigs = (gigs: Gig[]) => {
  gigs.forEach((gig) => {
    conn.query(
      "INSERT INTO gigs (title, date, price, link, soldOut, cancelled) VALUES (?, ?, ?, ?, ?, ?)",
      [gig.title, gig.date, gig.price, gig.link, gig.soldOut, gig.cancelled]
    )
  })
  conn.end()
  return "Gigs saved succesfully"
}
