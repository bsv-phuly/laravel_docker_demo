<template>
    <div class="uno-layout">
        <h1 className="hello-text m-1">Hello world!</h1>
        <div class="rounded-full w-16 h-16 bg-black"></div>
        <button class="rounded-full bg-blue-500 p-1 hover:bg-[#50d71e]">
            Button test
        </button>
        <button class="btn-green">Uno css button</button>
        <button class="custom-btn-white border-[red] border p-4">
            Custom uno css button
        </button>
        <button class="btn-hex-#EF8F35 py-1 px-2 border-0">保存する</button>
        <button bg="blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600" text="sm white" font="mono light"
            p="y-2 x-4" border="2 rounded blue-200">
            Button
        </button>
        <div class="custom-div hover:bg-black hover:text-cyan-300">
            Custom css div
        </div>
        <!-- <div class="">
            Blog post
            <label>Title</label>
            <div>{{ blog?.title }}</div>
            <label for="">Sub header</label>
            <div>{{ blog?.sub_header }}</div>
            <label for="">Content</label>
            <div>{{ blog?.content }}</div>
        </div> -->
        <div>Blog list</div>
        <main class="max-w-4xl mx-auto py-8 px-4">
            <section class="space-y-8">
                <article class="bg-white p-6 rounded-lg shadow-md" v-for="(content, i) in blogs" :key="i">
                    <h2 class="text-2xl font-bold mb-2">{{ content?.title }}</h2>
                    <p class="text-gray-500 text-sm mb-4">{{ content?.sub_header }}</p>
                    <p class="text-gray-700 mb-4">{{ content?.content }}</p>
                    <a href="#" class="text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded" @click="toBlog(content?.id)">Read More</a>
                </article>
            </section>
        </main>
        <div class="max-w-lg mx-auto p-8">
            <details class="open:bg-white dark:open:bg-slate-900 open:ring-1 open:ring-black/5 dark:open:ring-white/10 open:shadow-lg p-6 rounded-lg" open>
                <summary class="text-sm leading-6 text-slate-900 dark:text-white font-semibold select-none">
                Why do they call it Ovaltine?
                </summary>
                <div class="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                <p>The mug is round. The jar is round. They should call it Roundtine.</p>
                </div>
            </details>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useBroadcastStore } from "../stores/BroadcastStore";

const router = useRouter()
const storeBroadcast = useBroadcastStore()
const blogs = ref()
const blog = ref()

onMounted(() => {
    getBlogs()
})

const getBlogs = async () => {
    try {
        const { data } = await storeBroadcast.getBlogs()
        console.log(data);
        blogs.value = data
    } catch (error) {

    }
}

const toBlog = async (id) => {
    router.push({ name: 'BlogDetails', params: { id: id } })
}
</script>

<style scoped>
.custom-div {
  @apply bg-red-500 text-center p-4;
}
</style>
