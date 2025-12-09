<template>
    <div>
        <h1>About page</h1>
        <p>{{ mirzaStore.userData }}</p>
    </div>
</template>
<script setup>
    import { useMirzaStore } from '~/store/MirzaStore'
    const mirzaStore = useMirzaStore()
    definePageMeta({
        layout: 'default'
    })
</script>