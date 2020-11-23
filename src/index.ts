import {
  scrapeIlokivi,
  scrapeLutakko,
  scrapePoppari,
  getTestGigs,
  getNewGigs,
} from "./scrapers"
import { addNewGigs } from "./db"
import {
  getCancelled,
  getSoldOut,
  getRescheduled,
  getNewExtraGigs,
} from "./util"
;(async () => {
  const oldGigs = getTestGigs()
  const newGigs = getNewGigs()

  let gigs: Gig[] = []

  try {
    const lutakkoGigs = await scrapeLutakko()
    gigs.concat(lutakkoGigs)
  } catch (err) {
    console.error("Error scraping Lutakko: ", err)
  }
  try {
    const ilokiviGigs = await scrapeIlokivi()
    gigs.concat(ilokiviGigs)
  } catch (err) {
    console.error("Error scraping Ilokivi: ", err)
  }
  try {
    const poppariGigs = await scrapePoppari()
    gigs.concat(poppariGigs)
  } catch (err) {
    console.error("Error scraping Poppari: ", err)
  }

  const cancelled = getCancelled(oldGigs, newGigs)
  const soldOut = getSoldOut(oldGigs, newGigs)
  const rescheduled = getRescheduled(oldGigs, newGigs)
  const newExtraGigs = getNewExtraGigs(oldGigs, newGigs)
})()
