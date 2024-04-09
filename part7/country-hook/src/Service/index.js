import axios from 'axios'

const base = 'https://studies.cs.helsinki.fi/restcountries/api'

const getCountry = async (countryName) => {
    const res = await axios.get(`${base}/name/${countryName}`)
    return res.data
}

export default getCountry