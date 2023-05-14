export const usePostProject = async (data: {
  name: string;
  description: string;
  color: string;
  client: any;
  ticketStates: {
    name: string;
    order: number;
  }[];
  projectMembers: {
    userId: string;
    role: any;
  }[];
}) => {
  try {
    const res = await $fetch("/api/project/create", {
      method: "post",
      body: data,
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
