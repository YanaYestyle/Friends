import { Friend } from "@/models/friend";
import apiClient from "./api-client";

const friendMapper = (apiFriend: {
    id: number;
    img: string;
    first_name: string;
    last_name: string;
    status: string;
    available: boolean;
}): Friend => ({
    id: apiFriend.id,
    img: apiFriend.img,
    firstName: apiFriend.first_name,
    lastName: apiFriend.last_name,
    status: apiFriend.status,
    available: apiFriend.available,
});

export const getFriends = async (): Promise<Friend[]> => {
    const response = await apiClient.get<{
        id: number;
        img: string;
        first_name: string;
        last_name: string;
        status: string;
        available: boolean;
    }[]>("/friends");
    return response.data.map(friendMapper);
};

export const fetchFriendById = async (id: number): Promise<Friend> => {
    const response = await apiClient.get<Friend>(`/friends/${id}`);
    return response.data;
};
