"use client";

import { useEffect } from "react"
import { fetchWithResponse } from "./_utils/rest-client";

export default function Index() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchWithResponse('/api/docsmit/auth')
      console.log('xx response - ', response)
    }

    fetchData()
  }, [])

  return (
    <div className="container mx-auto max-w-full sm:px-4 md:px-10 mt-8">
      <h1 className="text-3xl font-bold mb-4">Docsmit Integration Demo</h1>
      
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-full text-sm">
        Get Test Token
      </button>

    </div>
  )
}
