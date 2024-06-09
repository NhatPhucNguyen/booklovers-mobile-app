import { Book } from "@/interfaces/Book";
import axios from "axios";
export const googleBookAPI = "https://www.googleapis.com/books/v1/volumes";
export const apiKey = process.env.EXPO_PUBLIC_GG_API_KEY;
export const getBooksBySubject = async (subject: string): Promise<Book[]> => {
    try {
        const response = await axios.get(
            `${googleBookAPI}?q=subject:${subject}&key=${apiKey}`
        );
        const data = response.data.items as { volumeInfo: Book }[];
        const books = data.map((item) => item.volumeInfo);
        return books;
    } catch (error) {
        console.log(error);
        throw new Error("Can not get books by subject");
    }
};

export const getNewestBooks = async (): Promise<Book[]> => {
    try {
        const response = await axios.get(
            `${googleBookAPI}?q=%&orderBy=newest&key=${apiKey}`
        );
        const data = response.data.items as { volumeInfo: Book }[];
        const books = data.map((item) => item.volumeInfo);
        return books;
    } catch (error) {
        console.log(error);
        throw new Error("Can not get newest books");
    }
};
