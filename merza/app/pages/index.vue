
<template>
    <div class="container px-10 mx-auto py-20">
        <h1 class="text-xl font-bold text-indigo-600 mb-10">Items Page</h1>


        <!-- add item button -->
         <section class="mb-10">
            <div class="add-form bg-gray-100 p-5 rounded w-5/12 mx-auto">
                <form class="max-w-sm mx-auto space-y-4">
                    <div>
                        <label for="visitors" class="block mb-2.5 text-sm font-medium text-heading">name</label>
                        <input type="text" id="visitors" v-model="payload.name" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs placeholder:text-body" placeholder="" required />
                    </div>
                    <div>
                        <label for="visitors" class="block mb-2.5 text-sm font-medium text-heading">color</label>
                        <input type="text" id="visitors" v-model="payload.color" class="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body" placeholder="" required />
                    </div>
                    <div>
                        <label for="visitors" class="block mb-2.5 text-sm font-medium text-heading">category</label>
                        <input type="text" id="visitors" v-model="payload.category" class="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-3.5 py-3 shadow-xs placeholder:text-body" placeholder="" required />
                    </div>
                    <div>
                        <label for="visitors" class="block mb-2.5 text-sm font-medium text-heading">price</label>
                        <input type="text" id="visitors" v-model="payload.price" class="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-4 py-3.5 shadow-xs placeholder:text-body" placeholder="" required />
                    </div>
                    <div>
                        <label for="visitors" class="block mb-2.5 text-sm font-medium text-heading">stock</label>
                        <input type="text" id="visitors" v-model="payload.stock" class="bg-neutral-secondary-medium border border-default-medium text-heading text-base rounded-base focus:ring-brand focus:border-brand block w-full px-4 py-3.5 shadow-xs placeholder:text-body" placeholder="" required />
                    </div>
                    <div class="flex items-center gap-2">
                        <button type="button" @click="addItem" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{{is_edit ? 'Update' : 'Add'}} Item</button>
                        <button type="button" @click="resetEdit()" v-if="is_edit" class="w-full text-white bg-red-600 hover:bg-danger-700 focus:ring-4 focus:outline-none focus:ring-danger-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-danger-600 dark:hover:bg-danger-700 dark:focus:ring-danger-800">Cancel</button>
                    </div>
                </form>
            </div>
         </section>
        <!-- table sectiom -->
        <section class="">
            <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
                <table class="w-full text-sm text-left rtl:text-right text-body">
                    <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                        <tr>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Product name
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Color
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Category
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Price
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Stock
                            </th>
                            <th scope="col" class="px-6 py-3 font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-neutral-primary border-b border-default" v-for="item in items.data" :key="item.id">
                            <th scope="row" class="px-6 py-4 font-medium text-heading whitespace-nowrap">
                               {{ item.name }}
                            </th>
                            <td class="px-6 py-4" >
                                <span class="" :title="item.color">{{ item.color }}</span>
                            </td>
                            <td class="px-6 py-4">
                                {{item.category}}
                            </td>
                            <td class="px-6 py-4">
                                {{item.price}}
                            </td>
                            <td class="px-6 py-4">
                                {{item.stock}}
                            </td>
                            <td class="px-6 py-4 flex items-center gap-2">
                                <button type="button" @click="viewItem(item)" class="w-full text-white bg-green-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View</button>
                                <button type="button" @click="updateInit(item)" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-danger-800">Update</button>
                                <button type="button" @click="deleteItem(item.id)" class="w-full text-white bg-red-600 hover:bg-danger-700 focus:ring-4 focus:outline-none focus:ring-danger-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-danger-600 dark:hover:bg-danger-700 dark:focus:ring-danger-800">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
</template>
<script setup>
    import { useItemsStore } from '~/store/items'
    const itemsStore = useItemsStore()
    const items = ref([])
    const is_edit= ref(false)
    const payload = ref({})
    const router = useRouter()
    const updateInit = (item) =>{
        is_edit.value = true
        Object.assign(payload.value, item)
    }

    const addItem = async () => {
        if(is_edit.value === false){
            await itemsStore.addItem(payload.value)
            items.value = await itemsStore.getItems()
            payload.value = {
                name: '',
                color: '',
                category: '',
                price: '',
                stock: ''
            }
        }else {
            await itemsStore.updateItem(payload.value)
            items.value = await itemsStore.getItems()
            payload.value = {
                name: '',
                color: '',
                category: '',
                price: '',
                stock: ''
            }
        }
        
    }
    const deleteItem = async (id) => {
        await itemsStore.deleteItem(id)
        items.value = await itemsStore.getItems()
    }
    const resetEdit = () => {
        is_edit.value = false
        payload.value = {
            name: '',
            color: '',
            category: '',
            price: '',
            stock: ''
        }
    }
    // store way
    // const viewItem = (item) => {
    //     itemsStore.item = item
    //     router.push('/ViewItem')
    // }


    // local way
    // const viewItem = (item) => {
    //     localStorage.setItem('item', JSON.stringify(item))
    //     router.push('/ViewItem')
    // }
    
    // route way
    // const viewItem = (item) => {
    //     router.push({
    //         path: '/ViewItem',
    //         query:{
    //             item: JSON.stringify(item)
    //         }
    //     })
    // }

    // api way
    const viewItem = (item) => {
        router.push({
            path: '/ViewItem',
            query:{
                id: item.id
            }
        })
    }

    // route way
    onMounted(async () => {
        items.value = await itemsStore.getItems()
    })
    definePageMeta({
        layout: 'default'
    })
</script>