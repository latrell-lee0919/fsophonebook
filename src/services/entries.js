import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = (newEntry) => {
    const request = axios.post(baseUrl, newEntry)
    return request.then(response => response.data)
}

const update = (id, newEntry) => {
    const request = axios.put(`${baseUrl}/${id}`, newEntry)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, remove }