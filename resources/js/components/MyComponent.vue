<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { socket } from "../socket";

const fooEvents = ref([]);

onMounted(() => {
    socket.on("foo", (...args) => {
        fooEvents.value.push(args);
    });
});
</script>
