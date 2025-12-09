import { defineStore } from 'pinia'
import axios from 'axios'
export const useAuthStore = defineStore('auth', () => {
    const userLoginData = ref({})

    async function login(loginData){
        const response = await axios.post('/login', loginData)
        userLoginData.value = {
            name:"mohammed",
            age:28,
            is_gad:false,
            is_married:"not yet",
            is_single:true,
        }
    }
    return {
        userLoginData,
        login
    }
})
