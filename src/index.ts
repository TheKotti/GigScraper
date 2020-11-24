import {
  scrapeIlokivi,
  scrapeLutakko,
  scrapePoppari,
  getOldTestGigs,
  getNewTestGigs,
} from "./scrapers"
import { addNewGigs } from "./db"
import {
  getCancelled,
  getSoldOut,
  getRescheduled,
  getNewExtraGigs,
  getNewGigs,
} from "./util"
;(async () => {
  const oldGigs = getOldTestGigs()
  const newGigs = getNewTestGigs()

  let gigs: Gig[] = []

  try {
    const lutakkoGigs = await scrapeLutakko()
    gigs = [...gigs, ...lutakkoGigs]
  } catch (err) {
    console.error("Error scraping Lutakko: ", err)
  }
  try {
    const ilokiviGigs = await scrapeIlokivi()
    console.log(ilokiviGigs)
    gigs = [...gigs, ...ilokiviGigs]
  } catch (err) {
    console.error("Error scraping Ilokivi: ", err)
  }
  try {
    const poppariGigs = await scrapePoppari()
    console.log(poppariGigs)
    gigs = [...gigs, ...poppariGigs]
  } catch (err) {
    console.error("Error scraping Poppari: ", err)
  }
  console.log(gigs)
})()
