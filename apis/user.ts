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
