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
  try {
    gigs.forEach((gig) => {
      conn.query(
        "INSERT INTO gigs (title, date, price, link, soldOut, cancelled) VALUES (?, ?, ?, ?, ?, ?)",
        [gig.title, gig.date, gig.price, gig.link, gig.soldOut, gig.cancelled]
      )
    })
    return "Gigs saved succesfully"
  } catch (err) {
    throw err
  }
}

export const updateCancelledAndSoldOutGigs = (gigs: Gig[]) => {
  try {
    gigs.forEach((gig) => {
      conn.query(
        "UPDATE gigs SET soldOut = ?, cancelled = ? WHERE title = ? AND date = ?",
        [gig.soldOut, gig.cancelled, gig.title, gig.date]
      )
    })
    return "Cancelled/sold out gigs updated succesfully"
  } catch (err) {
    throw err
  }
}

export const updateRescheduledGigs = (gigs: Gig[]) => {
  try {
    gigs.forEach((gig) => {
      conn.query("UPDATE gigs SET date = ? WHERE id = ?", [gig.date, gig.id])
    })
    return "Rescheduled gigs updated succesfully"
  } catch (err) {
    throw err
  }
}

//There's no way this is necessary but it seems to work
export const closeConnection = () => {
  conn.end()
}
