import { useState, useEffect } from 'react'
import getCountry from '../Service'


export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }

    const reset = () => setValue('')
  
    return {
      type,
      value,
      onChange,
      reset
    }
  }


export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    const getCountryByName = async () => {

      try {
        const country= await getCountry(name.toLowerCase())

        setCountry(country)
      } catch (error) {
        setCountry(null)
      }
    }
    if (name) {
      getCountryByName()
    }
  }, [name])

  return { data: country, error:null }
}