<template>
    <p>State: {{ connected }}</p>
    <p>State store: {{ connectionStore.isConnected }}</p>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { state } from '../socket';
import { useConnectionStore } from "../stores/connection";

const connectionStore = useConnectionStore();
const connected = computed(() => {
    console.log(state)
    return state.connected
});
</script>
