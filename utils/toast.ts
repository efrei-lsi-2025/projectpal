const lifeTime = 3000;

export const info = (body: string, title: string = "Information"): void => {
  const { vueApp } = useNuxtApp();
  vueApp.config.globalProperties.$toast.add({
    severity: "info",
    summary: title,
    detail: body,
    life: lifeTime,
  });
};

export const success = (body: string, title: string = "Succès"): void => {
  const { vueApp } = useNuxtApp();
  vueApp.config.globalProperties.$toast.add({
    severity: "success",
    summary: title,
    detail: body,
    life: lifeTime,
  });
};

export const error = (body: string, title: string = "Erreur"): void => {
  const { vueApp } = useNuxtApp();
  vueApp.config.globalProperties.$toast.add({
    severity: "error",
    summary: title,
    detail: body,
    life: lifeTime,
  });
};

export const warn = (body: string, title: string = "Attention"): void => {
  const { vueApp } = useNuxtApp();
  vueApp.config.globalProperties.$toast.add({
    severity: "warn",
    summary: title,
    detail: body,
    life: lifeTime,
  });
};
