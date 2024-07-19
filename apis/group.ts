import { Group } from "@/interfaces/Group";
import axiosInstance from "@/lib/axiosInstance";

type CreateGroupInput = {
    name: string;
    description?: string;
};
type EditGroupInput = {
    groupId: string;
} & CreateGroupInput;
type GroupParams = {
    q?: string;
    join?: boolean;
    userId?: string;
    startIndex?: number;
    maxResults?: number;
};
export const createGroup = async (input: CreateGroupInput) => {
    try {
        const response = await axiosInstance.post<{ groupId: string }>(
            "/groups",
            input
        );
        return response.data.groupId;
    } catch (error) {
        console.log(error);
        throw new Error("Fail to create group");
    }
};
export const editGroup = async (input: EditGroupInput) => {
    try {
        await axiosInstance.put(`/groups/${input.groupId}`, input);
        return true;
    } catch (error) {
        console.log(error);
        throw new Error("Fail to edit group");
    }
};
export const deleteGroup = async (groupId: string) => {
    try {
        await axiosInstance.delete(`/groups/${groupId}`);
        return true;
    } catch (error) {
        console.log(error);
        throw new Error("Fail to edit group");
    }
};
export const joinGroup = async (groupId: string) => {
    try {
        await axiosInstance.post(`/groups/${groupId}/join`);
        return true;
    } catch (error) {
        console.log(error);
        throw new Error("Fail to join group");
    }
};
export const getGroups = async (params: GroupParams): Promise<Group[]> => {
    try {
        const response = await axiosInstance.get("/groups", {
            params: params,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Fail to get groups");
    }
};
export const getGroupById = async (groupId: string): Promise<Group> => {
    try {
        const response = await axiosInstance.get(`/groups/${groupId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Fail to get group");
    }
};
