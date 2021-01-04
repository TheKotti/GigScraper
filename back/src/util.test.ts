import {
  parseDate,
  getNewGigs,
  getCancelled,
  getSoldOut,
  getRescheduled,
  getNewExtraGigs,
} from "./util"
import oldGigs from "./oldgigs.json"
import newGigs from "./newgigs.json"

test("Date parsing works correctly", () => {
  const date1 = parseDate("   24.1.2020")
  const date2 = parseDate("24.1")
  expect(date1).toBe("24.01.2020")
  expect(date2).toBe("24.01.2020")
})

test("New gigs are filtered correctly", () => {
  const extra = getNewGigs(oldGigs, newGigs)
  const extraTitles = extra.map((x) => x.title)
  expect(extraTitles).toEqual(["Lasten Hautausmaa akustisena"])
})

test("Cancelled gigs are filtered correctly", () => {
  const cancelled = getCancelled(oldGigs, newGigs)
  const cancelledTitles = cancelled.map((x) => x.title)
  expect(cancelledTitles).toEqual([
    "Maustetytöt",
    "SKENAARIO FREESTYLE RAP GAMESHOW",
  ])
})

test("Sold out gigs are filtered correctly", () => {
  const soldOut = getSoldOut(oldGigs, newGigs)
  const soldOutTitles = soldOut.map((x) => x.title)
  expect(soldOutTitles).toEqual(["BEHM"])
})

test("New extra gigs are filtered correctly", () => {
  const extra = getNewExtraGigs(oldGigs, newGigs)
  const extraTitles = extra.map((x) => x.title)
  expect(extraTitles).toEqual(["Aavikko"])
})

test("Rescheduled gigs are filtered correctly", () => {
  const rescheduled = getRescheduled(oldGigs, newGigs)
  expect(rescheduled).toEqual([
    {
      id: 7,
      title: "Black crucifixion, Rodent epoch +1",
      date: "14.12.2020",
      link:
        "https://www.ilokivi.fi/tapahtumat/black-crucifixion-rodent-epoch-1",
      venue: "Ilokivi",
      price: "Liput 10 €",
      soldOut: false,
      cancelled: false,
    },
    {
      id: 8,
      title:
        "Yiorgos Fakanas Group ft. Guthrie Govan (UK/GRE) + Mr. Fastfinger",
      date: "07.06.2021",
      link:
        "https://www.ilokivi.fi/tapahtumat/yiorgos-fakanas-group-feat-guthrie-govan",
      venue: "Ilokivi",
      price: "Liput 35 €",
      soldOut: false,
      cancelled: false,
    },
  ])
})
