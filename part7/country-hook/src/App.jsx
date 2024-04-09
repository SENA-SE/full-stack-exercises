import React, { useState } from 'react'
import { useField, useCountry } from './Hooks'
import Country from './Components/Country'




const App = () => {
  const {reset: resetName, ...nameInput} = useField('text')
  const [name, setName] = useState('')

  const country = useCountry(name)
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    resetName()
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button type='submit'>find</button>
      </form>

      {country.data && <Country country={country} />}
    </div>
  )
}

export default App