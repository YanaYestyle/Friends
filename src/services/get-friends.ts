import { Friend } from "@/models/friend";
import apiClient from "./api-client";
import { FriendDto } from "@/models/api/friend-dto";

const friendMapper = (friendDto: FriendDto): Friend => ({
    id: friendDto.id,
    img: friendDto.img,
    firstName: friendDto.first_name,
    lastName: friendDto.last_name,
    status: friendDto.status,
    available: friendDto.available,
});

export const getFriends = async (): Promise<Friend[]> => {
    const response = await apiClient.get<FriendDto[]>("/friends");
    return response.data.map(friendMapper);
};
