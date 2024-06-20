<template>
    <header class="bg-gray-800 text-white text-center py-4">
        <h1 class="text-3xl font-bold">My Blog</h1>
    </header>
    <RouterLink :to="{ name: 'UnoCssPage' }" class="text-gray-700 hover:text-gray-900 inline-flex items-center mb-4">
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Blog List
    </RouterLink>
    <div class="max-w-4xl mx-auto py-8 px-4">
        <article class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-4xl font-bold mb-4">{{ blog?.title }}</h2>
            <p class="text-gray-500 text-sm mb-4">{{ blog?.sub_header }}</p>
            <img src="https://via.placeholder.com/800x400" alt="Blog Post Image" class="w-full rounded mb-4">
            <div class="prose prose-lg text-gray-700">
                <p>{{ blog?.content }}</p>
            </div>
        </article>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useBroadcastStore } from "../stores/BroadcastStore";

const route = useRoute()
const router = useRouter()
const storeBroadcast = useBroadcastStore()
const blog = ref()

onMounted(() => {
    getBlog()
})

const getBlog = async () => {
    try {
        const { data } = await storeBroadcast.getBlog(route.params.id)
        console.log(data);
        blog.value = data
    } catch (error) {

    }
}
</script>

<style scoped></style>
