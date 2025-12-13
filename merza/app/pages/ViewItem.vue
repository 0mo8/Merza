<template>
    <div>
        <h1>View Item</h1>
        <!-- store way
        <div>
            {{ itemsStore.item }}
        </div> -->
        <!-- local way -->
        <!-- </div>
            {{ item }}
        </div> -->
        <!-- route way -->
        <!-- <div>
            {{ item }}
        </div> -->

        <!-- api way -->
        <div>
            {{ item.data }}
        </div>
    </div>
</template>

<script setup>
    import { useItemsStore } from '~/store/items'
    const itemsStore = useItemsStore()
    // store way
    // import { useItemsStore } from '~/store/items'
    // const itemsStore = useItemsStore()
    
    // local way
    // const item = JSON.parse(localStorage.getItem('item')) || null

    // route way
    // const route = useRoute()
    // const item = route.query.item

    // api way
    const route = useRoute()
    const id = route.query.id
    const item = await itemsStore.getItem(id)
    console.log(item)
</script>