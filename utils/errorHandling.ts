import { AxiosError } from "axios";

export const handleError = (error: any) => {
    console.log(error);
    if (error instanceof AxiosError) {
        return {
            error:
                (error.response?.data.message as string) ||
                "Something went wrong in server side",
        };
    }
    if (error instanceof Error) {
        return { error: error.message };
    }
    return { error: "Something went wrong" };
};
