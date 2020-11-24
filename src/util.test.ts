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

test("Rescheduled gigs are filtered correctly", () => {
  const rescheduled = getRescheduled(oldGigs, newGigs)
  const rescheduledTitles = rescheduled.map((x) => x.title)
  expect(rescheduledTitles).toEqual(["Black crucifixion, Rodent epoch +1"])
})

test("New extra gigs are filtered correctly", () => {
  const extra = getNewExtraGigs(oldGigs, newGigs)
  const extraTitles = extra.map((x) => x.title)
  expect(extraTitles).toEqual(["Aavikko"])
})
