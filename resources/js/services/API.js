import axios from 'axios'

const apiClient = axios.create({
    baseURL: `/api/v1`,
    withCredentials: true
})

apiClient.interceptors.request.use(
    (config) => {
        config.headers['Accept'] = 'application/json'
        return config
    },
    (error) => {
        return Promise.reject(error)
    },
)

apiClient.interceptors.response.use(async (response) => {
    return response
}, async (error) => {
    return Promise.reject(error)
})

export default apiClient
