import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import TextArea from "primevue/textarea";
import InputText from "primevue/inputtext";
import ColorPicker from "primevue/colorpicker";
import Chips from "primevue/chips";
import Menu from "primevue/menu";
import Avatar from "primevue/avatar";
import AutoComplete from "primevue/autocomplete";
import SelectButton from "primevue/selectbutton";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Dialog from "primevue/dialog";
import Listbox from "primevue/listbox";
import Paginator from "primevue/paginator";

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
  nuxtApp.vueApp.component("AutoComplete", AutoComplete);
  nuxtApp.vueApp.component("SelectButton", SelectButton);
  nuxtApp.vueApp.component("DataTable", DataTable);
  nuxtApp.vueApp.component("Column", Column);
  nuxtApp.vueApp.component("Dialog", Dialog);
  nuxtApp.vueApp.component("Listbox", Listbox);
  nuxtApp.vueApp.component("Paginator", Paginator);
});
