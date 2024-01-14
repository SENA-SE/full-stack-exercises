import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.WEATHER

const App = () => {
  const [value, setValue] = useState('')
  const [countryList, setCountryList] = useState([])
  const [country, setCountry] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log(response);
        setCountryList(response.data)
      })
  }, [])



  useEffect(() => {
    setCountry(countryList.filter(c => c.name.common.toLowerCase().includes(value.toLowerCase())) || [])

    // skip if country to be searched is not defined
    // if (value) {
    //   console.log('fetching country...')
    //   axios
    //     .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${value}`)
    //     .then(response => {
    //       console.log(response.data);
    //     })
    // }
  }, [value])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleClick = (e) => {
    setCountry(countryList.filter(c => c.name.common.toLowerCase().includes(e.target.id.toLowerCase())) || [])
  }


  return (
    <div>
      Country: <input value={value} onChange={handleChange} />
      {country.length > 10 && <div>Too many matches, please specify another filter</div>}
      {country.length < 10 && country.length > 1 && country.map((c, id) => <div key={c.name.common}>{c.name.common} <button key={id} id={c.name.common} onClick={handleClick}>show</button></div>)}
      {country.length == 1 && <Country country={country[0]} />
      }
    </div>
  )
}

const Country = ({ country }) => {

  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital[0]}</div>
      <div>Number of Areas: {country.area}</div>
      <h2>Languages</h2>
      {Object.keys(country.languages).map((key, index) => {
        return (
          <li key={index}>{key}: {country.languages[key]}</li>
        )
      })}
      <br />
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

export default App