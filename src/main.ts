import { createApp } from "vue";
import { key, store } from "./store";
import App from "@/App.vue";
import routes from "@/routes";

import "@fortawesome/fontawesome-free/css/all.css";

createApp(App).use(routes).use(store, key).mount("#app");
