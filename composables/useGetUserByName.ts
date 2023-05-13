export const useGetUserByName = (name: string) => {
    return $fetch(`/api/user/${name}`);
}