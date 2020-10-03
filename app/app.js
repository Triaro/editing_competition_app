import Vue from "nativescript-vue";
import App from "./components/App";


Vue.registerElement(
    'fab',
    () => require('@nstudio/nativescript-floatingactionbutton').Fab
  );
export const Bus = new Vue({});
new Vue({
    render: h => h(App)
}).$start();
