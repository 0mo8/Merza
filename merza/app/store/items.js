import { defineStore } from 'pinia'
import axios from 'axios'

export const useItemsStore = defineStore('items', () => {
    const item = ref(null)
    async function getItems() {
        return await axios.get('/items')
    }

    async function getItem(id) {
        return await axios.get(`/items/${id}`)
    }

    async function addItem(payload) {
        return await axios.post('/items', payload)
    }

    async function updateItem(payload) {
        return await axios.put(`/items/${payload.id}`, payload)
    }

    async function deleteItem(id) {
        return await axios.delete(`/items/${id}`)
    }
    
    return {
        getItems,
        addItem,
        getItem,
        updateItem,
        deleteItem,
        item
    }
})
