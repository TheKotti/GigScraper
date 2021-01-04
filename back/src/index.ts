import {
  scrapeIlokivi,
  scrapeLutakko,
  scrapePoppari,
  getOldTestGigs,
  getNewTestGigs,
} from "./scrapers"
import {
  addNewGigs,
  closeConnection,
  updateCancelledAndSoldOutGigs,
  updateRescheduledGigs,
  getAllGigs,
} from "./db"
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

  //Get real data and add it to gigs array
  /* try {
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
  } */

  //Test data for running the program for the first time
  /*   const n = getNewGigs([], oldGigs)
  const ne = getNewExtraGigs([], oldGigs)
  const so = getSoldOut([], oldGigs)
  const c = getCancelled([], oldGigs)
  const r = getRescheduled([], oldGigs) */

  //Test data for adding/updating data after the first time
  /* const n = getNewGigs(oldGigs, newGigs)
  const ne = getNewExtraGigs(oldGigs, newGigs)
  const so = getSoldOut(oldGigs, newGigs)
  const c = getCancelled(oldGigs, newGigs)
  const r = getRescheduled(oldGigs, newGigs) */

  //Run test datas into the database
  /* try {
    addNewGigs([...n, ...ne])
    updateCancelledAndSoldOutGigs([...so, ...c])
    updateRescheduledGigs(r)
    closeConnection()
  } catch (err) {
    console.log(err)
  } */
  /* try {
    const gigs = await getAllGigs()
    console.log(JSON.stringify(gigs))
    closeConnection()
  } catch (err) {
    console.log(err)
  } */
})()
