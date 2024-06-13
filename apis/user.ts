import { EditUserData } from "@/components/EditUserForm";
import axiosInstance from "@/lib/axiosInstance";
export interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    location?: string;
    about?: string;
    headline?: string;
    createdAt: string;
    updatedAt: string;
}
export const getCurrentUser = async (): Promise<User> => {
    try {
        const response = await axiosInstance.get("/users/current");
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Can not get current user");
    }
};

export const getUserById = async (id: string): Promise<User> => {
    try {
        const response = await axiosInstance.get("/users/" + id);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Can not get user by this id: " + id);
    }
};
export const updateUser = async (user: EditUserData): Promise<EditUserData> => {
    try {
        const response = await axiosInstance.put("/users/current", user);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Fail to update profile");
    }
};
