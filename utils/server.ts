export type NoUndefinedField<T> = Exclude<
  { [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>> },
  null | undefined
>;

export const deleteProject = async (id: number) => {
  try {
    await $fetch(`/api/projects/${id}`, { method: "DELETE" });
    success("Projet supprimé");
  } catch (err) {
    console.log(err);
    error("Erreur lors de la suppresion du projet.");
  }
};

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

export const getUser = async (id: string) => {
  try {
    const res = await $fetch(`/api/users/${id}`);
    return res as NoUndefinedField<typeof res>;
  } catch (err) {
    console.log(err);
    error("Erreur lors de la récupération de l'utilisateur.");
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

export type ProjectCreationDTO = {
  name: string;
  description: string;
  color: string;
  client: string;
  ticketStates: Array<{
    name: string;
    order: number;
  }>;
  projectMembers: Array<{
    userId: string;
    role: Exclude<
      Awaited<ReturnType<typeof getProject>>,
      undefined
    >["members"][number]["role"];
  }>;
};

export const createProject = async (project: ProjectCreationDTO) => {
  try {
    const res = await $fetch("/api/projects", {
      method: "POST",
      body: project,
    });
    success("Projet créé.");
    return res as NoUndefinedField<typeof res>;
  } catch (err) {
    console.log(err);
    error("Erreur lors de la création du projet.");
  }
};

export type TicketCreationDTO = {
  name: string;
  description: string;
  assignee: string;
  state: string;
};

export const createTicket = async (
  projectId: string,
  ticket: TicketCreationDTO
) => {
  try {
    const res = await $fetch(`/api/projects/${projectId}/tickets`, {
      method: "POST",
      body: ticket,
    });
    success("Ticket créé.");
    return res as NoUndefinedField<typeof res>;
  } catch (err) {
    console.log(err);
    error("Erreur lors de la création du ticket.");
  }
};

export const updateTicket = async (id: number, ticket: TicketCreationDTO) => {
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

export type ProjectUpdateDTO = {
  id: number;
  name: string;
  description: string;
  color: string;
  client: string;
  newMembers?: Array<{
    userId: string;
    role: Exclude<
      Awaited<ReturnType<typeof getProject>>,
      undefined
    >["members"][number]["role"];
  }>;
  updateMembers?: Exclude<
    Awaited<ReturnType<typeof getProject>>,
    undefined
  >["members"];
  deleteMembers?: Exclude<
    Awaited<ReturnType<typeof getProject>>,
    undefined
  >["members"];
};

export const updateProject = async (id: number, project: ProjectUpdateDTO) => {
  try {
    const res = await $fetch(`/api/projects/${id}`, {
      method: "PUT",
      body: project,
    });
    success("Projet mis à jour.");
    return res as NoUndefinedField<typeof res>;
  } catch (err) {
    console.log(err);
    error("Erreur lors de la mise à jour du projet.");
  }
};

export const createLog = async (text: string) => {
  try {
    const res = await $fetch('/api/log', {
      method: "POST",
      body: {
        text: text
      }
    });
    return res as NoUndefinedField<typeof res>;
  } catch (err) {
    console.log(err);
  }


}
export const getLogs = async (userId: string) => {
  try {
    const res = await $fetch(`/api/log/${userId}`);
    return res as NoUndefinedField<typeof res>;
  } catch (err) {
    console.log(err);
    error("Erreur lors de la récupération du log.");
  }
}
