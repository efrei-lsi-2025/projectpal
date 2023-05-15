export const useGetUserByName = async (name: string) => {
  try {
    const res = await $fetch(`/api/user/${name}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};
