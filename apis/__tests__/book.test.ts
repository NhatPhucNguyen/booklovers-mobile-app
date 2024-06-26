import axiosInstance from "@/lib/axiosInstance";
import MockAdapter from "axios-mock-adapter";
import { getBookById, getBooks } from "../book";
import { mockBookData } from "@/__mocks__/mockData";
const mock = new MockAdapter(axiosInstance);
const q = mockBookData[0].title;
const category = mockBookData[0].categories[0];
describe("Book API", () => {
    describe("getBooksByCategory", () => {
        it("should return books correctly", async () => {
            mock.onGet("/books").reply(200, mockBookData);
            const books = await getBooks();
            expect(books).toEqual(mockBookData);
        });
        it("should return books when the API call with query", async () => {
            mock.onGet(
                `/books?q=${q}&startIndex=1&category=${category}`
            ).reply(200, mockBookData);
            const books = await getBooks({ q, category });

            expect(books).toEqual(mockBookData);
        });
        it("should return error when API call is unsuccessful", async () => {
            mock.onGet(`/books`).reply(500);
            await expect(getBooks()).rejects.toThrow();
        });
    });
    describe("getBookById", () => {
        it("should return book correctly", async () => {
            mock.onGet(`/books/${mockBookData[0].id}?withReview=false`).reply(
                200,
                mockBookData[0]
            );
            const book = await getBookById(mockBookData[0].id);
            expect(book).toEqual(mockBookData[0]);
        });
        it("should return error when API call is unsuccessful", async () => {
            mock.onGet(`/books/${mockBookData[0].id}?withReview=false`).reply(500);
            await expect(getBookById(mockBookData[0].id)).rejects.toThrow();
        });
    });
});
