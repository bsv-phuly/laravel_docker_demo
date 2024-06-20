import API from './API'

export default {
    async callMessageBroadCast() {
        return await API.get('/broad-cast-message')
    },
    async sendMessageBroadCast(payload) {
        return await API.post('/send-broad-cast-message', payload)
    },
    async getBlog(id) {
        return await API.get(`/blogs/${id}`)
    },
    async getBlogs() {
        return await API.get(`/blogs/`)
    },
    async updateBlog(payload, id) {
        return await API.post(`/blogs/update/${id}`, payload)
    },
    async createBlog(payload) {
        return await API.post(`/blogs/create`, payload)
    },
}
