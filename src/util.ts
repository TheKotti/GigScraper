import jsdom from "jsdom"
import fetch from "node-fetch"
import moment from "moment"

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
