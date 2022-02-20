import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(baseUrl.concat(`/${updatedBlog.id}`), updatedBlog, config)
  return response.data
}

const removeBlog = async (blogToRemove) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(baseUrl.concat(`/${blogToRemove.id}`), config)
  return response.data
}

export default { getAll, setToken, createBlog, updateBlog, removeBlog }