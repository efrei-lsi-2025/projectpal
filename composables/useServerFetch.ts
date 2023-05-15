export const getProjects = async () => {
  try {
    const res = await $fetch("/api/projects");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProject = async (id: string) => {
  try {
    const res = await $fetch(`/api/projects/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getClients = async () => {
  try {
    const res = await $fetch("/api/clients");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = async () => {
  try {
    const res = await $fetch("/api/users");
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getUserByName = async (name: string) => {
  try {
    const res = await $fetch(`/api/users/${name}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getTicket = async (id: string) => {
  try {
    const res = await $fetch(`/api/tickets/${id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const createProject = async (project: object) => {
  try {
    const res = await $fetch("/api/projects", {
      method: "POST",
      body: project,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
