export const usePostProject = (data: {
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
    return $fetch('/api/project/create', {method: 'post', body: data})
}