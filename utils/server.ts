export type NoUndefinedField<T> = Exclude<
  { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> },
  null | undefined
>;

export const getProjects = async () => {
  try {
    const res = await $fetch(`/api/projects`);
    return res as NoUndefinedField<typeof res>;
  } catch (err) {
    console.log(err);
    error("Erreur lors de la récupération des projets.");
  }
};

export const getProject = async (id: string) => {
  try {
    const res = await $fetch(`/api/projects/${id}`);
    return res as NoUndefinedField<typeof res>;
  } catch (err) {
    console.log(err);
    error("Erreur lors de la récupération du projet.");
  }
};

export const getClients = async () => {
  try {
    const res = await $fetch("/api/clients");
    return res as NoUndefinedField<typeof res>;
  } catch (err) {
    console.log(err);
    error("Erreur lors de la récupération des clients.");
  }
};

export const getUsers = async () => {
  try {
    const res = await $fetch("/api/users");
    return res as NoUndefinedField<typeof res>;
  } catch (err) {
    console.log(err);
    error("Erreur lors de la récupération des utilisateurs.");
  }
};

export const getUserByName = async (name: string) => {
  try {
    const res = await $fetch(`/api/users/${name}`);
    return res as NoUndefinedField<typeof res>;
  } catch (err) {
    console.log(err);
    error("Erreur lors de la récupération de l'utilisateur.");
  }
};

export const getTicket = async (id: string) => {
  try {
    const res = await $fetch(`/api/tickets/${id}`);
    return res as NoUndefinedField<typeof res>;
  } catch (err) {
    console.log(err);
    error("Erreur lors de la récupération du ticket.");
  }
};

export const createProject = async (project: object) => {
  try {
    const res = await $fetch("/api/projects", {
      method: "POST",
      body: project,
    });
    return res as NoUndefinedField<typeof res>;
  } catch (err) {
    console.log(err);
    error("Erreur lors de la création du projet.");
  }
};

export const updateTicket = async (id: string, ticket: object) => {
  try {
    const res = await $fetch(`/api/tickets/${id}`, {
      method: "PUT",
      body: ticket,
    });
    success("Ticket mis à jour.");
    return res as NoUndefinedField<typeof res>;
  } catch (err) {
    console.log(err);
    error("Erreur lors de la mise à jour du ticket.");
  }
};
