import jsdom from "jsdom"
import fetch from "node-fetch"
import moment from "moment"
import _ from "lodash"
import { RSA_X931_PADDING } from "constants"

/**
 * Return DOM of target URL
 * @param url target URL
 */
export const getDom = async (url: string) => {
  const page = await fetch(url)
  const text = await page.text()
  return new jsdom.JSDOM(text)
}

/**
 * Search for date in dateString, return date in outputFormat or null if not found
 * @param dateString
 * @param outputFormat default: 'DD.MM.YYYY'
 */
export const parseDate = (
  dateString?: string | null,
  outputFormat = "DD.MM.YYYY"
) => {
  if (!dateString) return null
  const regex = /\d+(\.\d+)+/g
  const reArr = regex.exec(dateString)
  if (!reArr || reArr?.length === 0) return null
  const formatted = moment(reArr[0], "DD.MM.YYYY").format(outputFormat)
  return formatted
}

/**
 * Return newly cancelled gigs, in their current state
 * @param oldGigs
 * @param newGigs
 */
export const getCancelled = (oldGigs: Gig[], newGigs: Gig[]) => {
  return newGigs.filter((n) =>
    oldGigs.some(
      (o) =>
        n.title === o.title && //title matches
        n.date === o.date && //date matches
        n.cancelled !== o.cancelled //cancelled has changed
    )
  )
}

/**
 * Return newly cancelled or sold out gigs, in their current state
 * @param oldGigs
 * @param newGigs
 */
export const getSoldOut = (oldGigs: Gig[], newGigs: Gig[]) => {
  return newGigs.filter((n) =>
    oldGigs.some(
      (o) =>
        n.title === o.title && //title matches
        n.date === o.date && //date matches
        n.soldOut !== o.soldOut //soldOut or cancelled has changed
    )
  )
}

/**
 * Return newly rescheduled gigs, with their new dates
 * @param oldGigs
 * @param newGigs
 */
export const getRescheduled = (oldGigs: Gig[], newGigs: Gig[]) => {
  return newGigs.filter((x) => {
    return oldGigs.some((x2) => {
      const c = oldGigs.filter((a) => a.title === x.title).length
      const c2 = newGigs.filter((a) => a.title === x.title).length
      return (
        x.title === x2.title && //title matches
        x.date !== x2.date && //date has changed
        c === c2 //no new gigs with same title
      )
    })
  })
}

/**
 * Return newly added extra gigs, with their new dates
 * @param oldGigs
 * @param newGigs
 */
export const getNewExtraGigs = (oldGigs: Gig[], newGigs: Gig[]) => {
  return newGigs.filter((x) => {
    return oldGigs.some((x2) => {
      const c = oldGigs.filter((a) => a.title === x.title).length
      const c2 = newGigs.filter((a) => a.title === x.title).length
      return (
        x.title === x2.title && //title matches
        x.date !== x2.date && //date has changed
        c < c2 //more gigs with same title than previously
      )
    })
  })
}
