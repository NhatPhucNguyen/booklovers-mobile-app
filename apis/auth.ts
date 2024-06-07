import axiosInstance from "@/lib/axiosInstance";
import { removeData } from "@/lib/storage";
import { handleError } from "@/utils/errorHandling";

export const login = async (
    email: string,
    password: string
): Promise<{ accessToken?: string; error?: string }> => {
    try {
        const response = await axiosInstance.post("/users/login", {
            email,
            password,
        });
        const { accessToken } = response.data as { accessToken: string };
        return { accessToken };
    } catch (error) {
        return handleError(error);
    }
};
type RegisterInput = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};
export const register = async (
    registerInput: RegisterInput
): Promise<{ success?: boolean; error?: string }> => {
    try {
        await axiosInstance.post("/users/register", registerInput);
        return { success: true };
    } catch (error) {
        return handleError(error);
    }
};

export const logout = async (): Promise<{
    success?: boolean;
    error?: string;
}> => {
    try {
        await axiosInstance.delete("/users/logout");
        await removeData("token");
        return { success: true };
    } catch (error) {
        return handleError(error);
    }
};

export const verifyToken = async (): Promise<{
    success?: boolean;
    error?: string;
}> => {
    try {
        await axiosInstance.get("/users");
        return { success: true };
    } catch (error) {
        return handleError(error);
    }
};
