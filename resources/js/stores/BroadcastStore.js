import { defineStore } from 'pinia'
import BroadcastService from '../services/BroadcastService'

export const useBroadcastStore = defineStore('broadcast', {
    state: () => ({
        broadCast: null,
    }),
    getters: {
        broadCastData: (state) => state.broadCast,
    },
    actions: {
        async callMessageBroadCast() {
            return new Promise((resolve, reject) => {
                BroadcastService.callMessageBroadCast()
                    .then(({ data }) => {
                        resolve(data)
                    })
                    .catch(({ response }) => reject(response))
            })
        },
        async sendMessageBroadCast(payload) {
            return new Promise((resolve, reject) => {
                BroadcastService.sendMessageBroadCast(payload)
                    .then(({ data }) => {
                        resolve(data)
                    })
                    .catch(({ response }) => reject(response))
            })
        },
        async getBlog(id) {
            return new Promise((resolve, reject) => {
                BroadcastService.getBlog(id)
                    .then(({ data }) => {
                        resolve(data)
                    })
                    .catch(({ response }) => reject(response))
            })
        },
        async updateBlog(payload, id) {
            return new Promise((resolve, reject) => {
                BroadcastService.updateBlog(payload, id)
                    .then(({ data }) => {
                        resolve(data)
                    })
                    .catch(({ response }) => reject(response))
            })
        },
        async getBlogs() {
            return new Promise((resolve, reject) => {
                BroadcastService.getBlogs()
                    .then(({ data }) => {
                        resolve(data)
                    })
                    .catch(({ response }) => reject(response))
            })
        },
        async createBlog(payload) {
            return new Promise((resolve, reject) => {
                BroadcastService.createBlog(payload)
                    .then(({ data }) => {
                        resolve(data)
                    })
                    .catch(({ response }) => reject(response))
            })
        },
    }
})
