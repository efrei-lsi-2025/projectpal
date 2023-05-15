export const useGetAllProjects = async () =>  {
  try {
    const res = await $fetch("/api/project");
    return res;
  } catch (error) {
    console.error(error);
  }
};