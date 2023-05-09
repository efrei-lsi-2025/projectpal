import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import TextArea from "primevue/textarea";
import InputText from "primevue/inputtext";
import ColorPicker from "primevue/colorpicker";
import Chips from "primevue/chips";
import Menu from "primevue/menu";
import Avatar from "primevue/avatar";

import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true });
  nuxtApp.vueApp.use(ToastService);

  nuxtApp.vueApp.component("Toast", Toast);
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("TextArea", TextArea);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("ColorPicker", ColorPicker);
  nuxtApp.vueApp.component("Chips", Chips);
  nuxtApp.vueApp.component("Menu", Menu);
  nuxtApp.vueApp.component("Avatar", Avatar);
});
