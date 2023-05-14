export const useGetAllUsers = () => {
    return $fetch('/api/user');
}