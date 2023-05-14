export const useGetAllUsers = async () => {
  try {
    const res = await $fetch("/api/user");
    return res;
  } catch (error) {
    console.error(error);
  }
};
