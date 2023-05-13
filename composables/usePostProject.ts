import { Client, Role } from "@prisma/client"

export const usePostProject = (data: {
    name: string;
    description: string;
    color: string;
    client: Client | undefined;
    ticketStates: {
        name: string;
        order: number;
    }[];
    projectMembers: {
        userId: string;
        role: Role;
    }[];
}) => {
    return $fetch('/api/project/create', {method: 'post', body: data})
}