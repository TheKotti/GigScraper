import { getDom, parseDate } from "./util"

/**
 * Scrape gig information from Lutakko
 */
export const scrapeLutakko = async (): Promise<Gig[]> => {
  try {
    const url = "https://www.jelmu.net/"
    const dom = await getDom(url)
    const gigList = dom.window.document.querySelector(
      "html body div.container div.content div.contain article ul"
    )
    if (!gigList) return []
    return Array.from(gigList.children).map((x) => {
      return {
        id: 0,
        title: x.querySelector("a span")?.textContent || "",
        date:
          parseDate(x.querySelector("div.badges div.date span")?.textContent) ||
          "",
        price: x.querySelector("div div a strong")?.textContent || "",
        link: url + x.querySelector("a")?.getAttribute("href") || "",
        soldOut: x.textContent?.toLowerCase().includes("loppuunmyyty") || false,
        cancelled: x.textContent?.toLowerCase().includes("peruttu") || false,
      }
    })
  } catch (err) {
    console.error("Error scraping Lutakko: ", err)
    return []
  }
}

/**
 * Scrap gig information from Ilokivi
 */
export const scrapeIlokivi = async (): Promise<Gig[]> => {
  try {
    const dom = await getDom(
      "https://www.ilokivi.fi/tapahtumat/kategoria/keikat"
    )
    const gigList = dom.window.document.querySelectorAll(
      "div.events-group > div.events-group-wrapper > div.event"
    )
    return Promise.all(
      Array.from(gigList).map(async (x) => {
        const detailUrl = x
          .querySelector("div.event-head-wrapper a")
          ?.getAttribute("href")
        let price
        if (detailUrl) {
          const detailDom = await getDom(detailUrl)
          price = detailDom.window.document.querySelector(
            "div.details-event p.details span.price"
          )?.textContent
        }

        return {
          id: 0,
          title: x.querySelector("div.details h3 a")?.textContent || "",
          date:
            parseDate(
              x.querySelector("div.event-head-wrapper div.head div.time p")
                ?.textContent
            ) || "",
          link: detailUrl || "",
          price: price || "",
          soldOut:
            x.textContent?.toLowerCase().includes("loppuunmyyty") || false,
          cancelled: x.textContent?.toLowerCase().includes("peruttu") || false,
        }
      })
    )
  } catch (err) {
    console.error("Error scraping Ilokivi: ", err)
    return []
  }
}

/**
 * Scrape gig information from Poppari
 */
export const scrapePoppari = async (): Promise<Gig[]> => {
  try {
    const url = "http://ravintolapoppari.fi/keikat/"
    const dom = await getDom(url)
    const gigList = dom.window.document.querySelector(
      "div.post-entry div.giglist"
    )
    if (!gigList) return []
    const excludedWords = ["workshop", "musaklubi"]
    return Array.from(gigList.children)
      .map((x) => {
        if (
          !excludedWords.some((ew) => x.textContent?.toLowerCase().includes(ew))
        ) {
          return {
            id: 0,
            title:
              x.querySelector("div.gig div.gigpress-artist h2")?.textContent ||
              "",
            date: parseDate(
              x.querySelector("div.gig div.gigpress-date span.showdate")
                ?.textContent || ""
            ),
            link: url || "",
            price:
              x.querySelector("div.gig div.gigpress-date span.price")
                ?.textContent || "",
            soldOut:
              x.textContent?.toLowerCase().includes("loppuunmyyty") || false,
            cancelled:
              x.textContent?.toLowerCase().includes("peruttu") || false,
          }
        }
      })
      .filter((x): x is Gig => x !== undefined)
  } catch (err) {
    console.error("Error scraping Poppari: ", err)
    return []
  }
}