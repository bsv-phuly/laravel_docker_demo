<template>
    <SidebarMenu>
        <div class="radio-inputs">
            <label class="radio">
                <input type="radio" name="UnoCssPage" value="UnoCssPage" v-model="currentRoute" />
                <span class="name">Uno Page</span>
            </label>
            <label class="radio">
                <input type="radio" name="BlogForm" value="BlogForm" v-model="currentRoute" />
                <span class="name">Blogform page</span>
            </label>

            <label class="radio">
                <input type="radio" name="Movie" value="Movie" v-model="currentRoute" />
                <span class="name">Movie</span>
            </label>
        </div>

        <div>
            message
            <input v-model="mes" type="text" />
            <button @click="sendMessage(mes)">Send</button>
            <ul>
                <li v-for="(message, index) in messages" :key="index">
                    {{ message?.message }}
                </li>
            </ul>
        </div>
        <RouterView />
    </SidebarMenu>
</template>

<script lang="ts" setup>
import Pusher from "pusher-js";
import { onMounted, ref, watch } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { useBroadcastStore } from "./stores/BroadcastStore";
import SidebarMenu from "./components/SidebarMenu.vue";
// import { socket } from "./socket";

const router = useRouter();
const route = useRoute();
const storeBroadcast = useBroadcastStore();
const messages = ref([]);
const mes = ref("");
const currentRoute = ref("");

onMounted(() => {
    setTimeout(() => {
        currentRoute.value = route.name ? route.name : ''
    }, 100)
    initPusher();
    // socket.close()
});

watch(
    () => currentRoute.value,
    (oldValue) => {
        router.push({ name: currentRoute.value })
    }
)

const callBroadcast = async () => {
    try {
        await storeBroadcast.callMessageBroadCast();
    } catch (error) { }
};

const sendMessage = async (message) => {
    try {
        await storeBroadcast.sendMessageBroadCast({ message: message });
    } catch (error) { }
};

const initPusher = () => {
    Pusher.logToConsole = true;
    const pusher = new Pusher("0863ce0d9d7169853dd2", {
        cluster: "ap1",
    });
    const channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function (data: any) {
        messages.value.push(data);
        mes.value = '';
    });
    return messages;
};
</script>

<style>
.radio-inputs {
    position: relative;
    display: flex;
    border-radius: 0.5rem;
    background-color: #70c489;
    box-sizing: border-box;
    font-size: 14px;
    width: 100%;
    padding: 1rem 1rem 0 1rem;
}

.radio-inputs .radio input {
    display: none;
}

.radio-inputs .radio .name {
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    border: none;
    padding: 0.5rem 0.8rem;
    color: ;
    transition: all 0.15s ease-in-out;
    position: relative;
}

.radio-inputs .radio input:checked+.name {
    background-color: #e8e8e8;
    font-weight: 600;
}

.radio-inputs .radio input+.name:hover {
    color: #fff;
}

.radio-inputs .radio input:checked+.name:hover {
    color: #1d1d29;
}

.radio-inputs .radio input:checked+.name::after,
.radio-inputs .radio input:checked+.name::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: #70c489;
    bottom: 0;
}

.radio-inputs .radio input:checked+.name::after {
    right: -10px;
    border-bottom-left-radius: 300px;
    box-shadow: -3px 3px 0px 3px #e8e8e8;
}

.radio-inputs .radio input:checked+.name::before {
    left: -10px;
    border-bottom-right-radius: 300px;
    box-shadow: 3px 3px 0px 3px #e8e8e8;
}
</style>
