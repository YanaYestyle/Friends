import { FriendDetailsDto } from "@/models/api/friend-details-dto";
import apiClient from "./api-client";
import { FriendDetails } from "@/models/friend-details";

const friendDetailsMapper = (friendDetailsDto: FriendDetailsDto): FriendDetails => ({
    address: friendDetailsDto.address_1,
    available: friendDetailsDto.available,
    bio: friendDetailsDto.bio,
    city: friendDetailsDto.city,
    firstName: friendDetailsDto.first_name,
    id: friendDetailsDto.id,
    img: friendDetailsDto.img,
    lastName: friendDetailsDto.last_name,
    phone: friendDetailsDto.phone,
    photos: friendDetailsDto.photos,
    state: friendDetailsDto.state,
    statuses: friendDetailsDto.statuses,
    zipCode: friendDetailsDto.zipcode
});

export const getFriendDetails = async (id: string): Promise<FriendDetails> => {
    const response = await apiClient.get<FriendDetailsDto>(`/friends/${id}`);
    return friendDetailsMapper(response.data);
};