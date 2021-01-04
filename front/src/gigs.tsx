import React, { useEffect, useState } from "react"
import { getAllGigs } from "./api"

type Props = {}

const Gigs = (props: Props) => {
  const [gigs, setGigs] = useState<any>([])

  useEffect(() => {
    const loadGigs = async () => {
      const result = await getAllGigs()
      setGigs(result)
    }
    loadGigs()
  }, [])

  return <pre>{JSON.stringify(gigs, null, 2)}</pre>
}

export default Gigs
