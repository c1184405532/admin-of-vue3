import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";

import "ant-design-vue/lib/notification/style";
import "ant-design-vue/lib/message/style";

const app = createApp(App);
app.use(router);
app.mount("#app");
