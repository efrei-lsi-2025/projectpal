const lifeTime = 3000;

export const info = (body: string, title: string = "Info"): void => {
  const { vueApp } = useNuxtApp();
  vueApp.config.globalProperties.$toast.add({
    severity: "info",
    summary: title,
    detail: body,
    life: lifeTime,
  });
};

export const success = (body: string, title: string = "Success"): void => {
  const { vueApp } = useNuxtApp();
  vueApp.config.globalProperties.$toast.add({
    severity: "success",
    summary: title,
    detail: body,
    life: lifeTime,
  });
};

export const error = (body: string, title: string = "Error"): void => {
  const { vueApp } = useNuxtApp();
  vueApp.config.globalProperties.$toast.add({
    severity: "error",
    summary: title,
    detail: body,
    life: lifeTime,
  });
};

export const warn = (body: string, title: string = "Warning"): void => {
  const { vueApp } = useNuxtApp();
  vueApp.config.globalProperties.$toast.add({
    severity: "warn",
    summary: title,
    detail: body,
    life: lifeTime,
  });
};
