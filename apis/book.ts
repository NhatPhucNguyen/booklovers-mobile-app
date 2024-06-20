import { Book } from "@/interfaces/Book";
import axiosInstance from "@/lib/axiosInstance";
type BookQuery = {
    category?: string;
    searchKey?: string;
};
export const getBooks = async (query?: BookQuery): Promise<Book[]> => {
    try {
        if (!query) {
            const response = await axiosInstance.get(`/books`);
            return response.data;
        }
        const response = await axiosInstance.get(
            `/books?searchKey=${query?.searchKey}&category=${query?.category}`
        );
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Can not get newest books");
    }
};
export const getBookById = async (id: string): Promise<Book> => {
    try {
        const response = await axiosInstance.get(`/books/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Can not get book by this id: " + id);
    }
};
