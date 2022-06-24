import { createApp } from "vue";
import App from "@/App.vue";
import routes from "@/routes";

import "@fortawesome/fontawesome-free/css/all.css";

createApp(App).use(routes).mount("#app");
