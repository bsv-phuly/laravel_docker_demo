<template>
    <button @click="connect()">Connect</button>
    <button @click="disconnect()">Disconnect</button>
</template>

<script lang="ts" setup>
import { socket } from "../socket";

const connect = () => {
    socket.connect();
    console.log(socket.connect())
};

const disconnect = () => {
    socket.disconnect();
};
</script>
