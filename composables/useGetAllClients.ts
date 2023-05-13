export const useGetAllClients = () => {
    return $fetch('/api/client');
}