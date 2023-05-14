export const useGetProjectById = async (id: number) => {
  try {
    const res = await $fetch(`/api/project/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
};
