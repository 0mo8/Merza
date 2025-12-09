import { defineStore } from 'pinia'

export const useMirzaStore = defineStore('mirza', () => {
    const userData = ref({
        name:"Mirza",
        age:30,
        is_gad:true,
        is_married:"maybe",
        is_single:false,
    })


    return {
        userData,
    }
})
