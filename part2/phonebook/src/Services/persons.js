import axios from 'axios'
// const baseUrl = 'http://localhost:3001/persons'  // used by part2
// const baseUrl = 'http://localhost:3001/api/persons' // used by part3
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const update = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson)
  return request.then(response => response.data)
}
const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    
    return request.then(response => {
      return response.data
    })
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update,
  delete: deletePerson
}