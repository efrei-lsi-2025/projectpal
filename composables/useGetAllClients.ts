export const useGetAllClients = async () => {
  try {
    const res = await $fetch("/api/client");
    return res;
  } catch (error) {
    console.error(error);
  }
};
