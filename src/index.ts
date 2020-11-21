import { scrapeIlokivi, scrapeLutakko, scrapePoppari } from "./scrapers"
;(async () => {
  try {
    const lutakkoGigs = await scrapeLutakko()
    const ilokiviGigs = await scrapeIlokivi()
    const poppariGigs = await scrapePoppari()
    console.log("done")
  } catch (e) {
    console.log(e)
  }
})()
