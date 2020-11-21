import { scrapeIlokivi, scrapeLutakko, scrapePoppari } from "./scrapers"
import { addNewGigs } from "./db"
;(async () => {
  try {
    const lutakkoGigs = await scrapeLutakko()
    const ilokiviGigs = await scrapeIlokivi()
    const poppariGigs = await scrapePoppari()
    const res = addNewGigs([...lutakkoGigs, ...ilokiviGigs, ...poppariGigs])
    console.log(res)
  } catch (e) {
    console.log(e)
  }
})()
