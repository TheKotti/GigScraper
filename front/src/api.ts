import axios, { AxiosResponse } from "axios"
import MockAdapter from "axios-mock-adapter"

import mockGigs from "./mockgigs.json"

const mockAxios = axios.create()
const mock = new MockAdapter(mockAxios)

mock.onGet(`/getAllGigs`).reply(200, mockGigs)

export const getAllGigs = async () => {
  try {
    const response: AxiosResponse = await mockAxios.get(`/getAllGigs`)
    return response.data
  } catch (err) {
    throw err
  }
}
