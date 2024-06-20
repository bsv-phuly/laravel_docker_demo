import './bootstrap';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { createPinia } from 'pinia'
import 'uno.css'

// import { createServer } from "http";
// import { Server } from "socket.io";

// const httpServer = createServer();
// const io = new Server(httpServer, {
//     cors: {
//         origin: "http://localhost:8000",
//         credentials: true
//     }
// });

// httpServer.listen(3000);
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
// app.use(io)
app.mount("#app")
