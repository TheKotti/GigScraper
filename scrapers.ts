import moment from 'moment'
import { getDom, parseDate } from './util'

export const scrapeEverything = async (): Promise<Gig[]> => {
  try {
    const lutakkoGigs = await scrapeLutakko()
    const ilokiviGigs = await scrapeIlokivi()
    const poppariGigs = await scrapePoppari()

    return [...lutakkoGigs, ...ilokiviGigs, ...poppariGigs]
  } catch (err) {
    throw err
  }
}

export const scrapeLutakko = async (): Promise<Gig[]> => {
  try {
    const url = 'https://www.jelmu.net/'
    const dom = await getDom(url)
    const gigList = dom.window.document.querySelector('html body div.container div.content div.contain article ul')
    if (!gigList) return []

    let latestDate

    return Array.from(gigList.children).map((gigItem: any) => {
      // Get 'a span' if it exists to get multiple artists, or as a backup just 'a'
      const title =
        Array.from(gigItem.querySelectorAll('a span'))
          ?.map((artistSpan: any) => artistSpan.textContent)
          .join(', ') ||
        gigItem.querySelector('a')?.textContent ||
        ''

      const date = moment(parseDate(gigItem.querySelector('div.badges div.date span')?.textContent), 'DD.MM.YYYY')

      if (latestDate && latestDate.unix() > date.unix()) {
        date.add(1, 'year')
      }
      latestDate = date

      return {
        title,
        date: date.format('DD.MM.YYYY'),
        price: gigItem.querySelector('div div a strong')?.textContent || '',
        link: url + gigItem.querySelector('a')?.getAttribute('href') || '',
        venue: 'Lutakko',
        soldOut: gigItem.textContent?.toLowerCase().includes('loppuunmyyty') || false,
        cancelled: gigItem.textContent?.toLowerCase().includes('peruttu') || false,
      }
    })
  } catch (err) {
    throw err
  }
}

export const scrapeIlokivi = async (): Promise<Gig[]> => {
  try {
    const dom = await getDom('https://www.ilokivi.fi/tapahtumat/kategoria/keikat')
    const gigList = dom.window.document.querySelectorAll('div.events-group > div.events-group-wrapper > div.event')

    return Promise.all(
      Array.from(gigList).map(async (gigItem: any) => {
        const detailUrl = gigItem.querySelector('div.event-head-wrapper a')?.getAttribute('href')
        let price
        if (detailUrl) {
          const detailDom = await getDom(detailUrl)
          price = detailDom.window.document.querySelector('div.details-event p.details span.price')?.textContent
        }

        return {
          title: gigItem.querySelector('div.details h3 a')?.textContent || '',
          date: parseDate(gigItem.querySelector('div.event-head-wrapper div.head div.time p')?.textContent),
          link: detailUrl || '',
          venue: 'Ilokivi',
          price: price || '',
          soldOut: gigItem.textContent?.toLowerCase().includes('loppuunmyyty') || false,
          cancelled: gigItem.textContent?.toLowerCase().includes('peruttu') || false,
        }
      })
    )
  } catch (err) {
    throw err
  }
}

export const scrapePoppari = async (): Promise<Gig[]> => {
  try {
    const url = 'http://ravintolapoppari.fi/keikat/'
    const dom = await getDom(url)
    const gigList = dom.window.document.querySelector('div.post-entry div.giglist')
    if (!gigList) return []

    const excludedWords = ['workshop', 'musaklubi']
    let latestDate

    return Array.from(gigList.children)
      .map((gigItem: any) => {
        if (!excludedWords.some((ew) => gigItem.textContent?.toLowerCase().includes(ew))) {
          const date = moment(
            parseDate(gigItem.querySelector('div.gig div.gigpress-date span.showdate')?.textContent),
            'DD.MM.YYYY'
          )

          if (latestDate && latestDate.unix() > date.unix()) {
            date.add(1, 'year')
          }
          latestDate = date

          return {
            title: gigItem.querySelector('div.gig div.gigpress-artist h2')?.textContent || '',
            date: date.format('DD.MM.YYYY'),
            link: url || '',
            venue: 'Poppari',
            price: gigItem.querySelector('div.gig div.gigpress-date span.price')?.textContent || '',
            soldOut: gigItem.textContent?.toLowerCase().includes('loppuunmyyty') || false,
            cancelled: gigItem.textContent?.toLowerCase().includes('peruttu') || false,
          }
        }
      })
      .filter((x): x is Gig => x !== undefined)
  } catch (err) {
    throw err
  }
}
