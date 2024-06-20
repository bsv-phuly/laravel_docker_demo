<template>
    <form @submit.prevent="onSubmit">
        <input v-model="value" />

        <button type="submit" :disabled="isLoading">Submit</button>
    </form>
    <ul>
        <li v-for="(item, index) in itemStore.items" :key="index">
            {{ item?.label }}
        </li>
    </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { socket } from "../socket";
import { useItemStore } from "../stores/item";

const itemStore = useItemStore();
const isLoading = ref(false);
const value = ref("");

const onSubmit = () => {
    isLoading.value = true;
    itemStore.bindEvents();
    itemStore.createItem(value.value);
    socket.timeout(5000).emit("create-something", value.value, (err, responses) => {
        console.log(err, responses)
        isLoading.value = false;
    });
};
</script>
