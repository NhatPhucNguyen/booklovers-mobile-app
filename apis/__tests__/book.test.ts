import axiosInstance from "@/lib/axiosInstance";
import MockAdapter from "axios-mock-adapter";
import { getBooks } from "../book";
import { mockBookData } from "@/__mocks__/mockData";
const mock = new MockAdapter(axiosInstance);
const searchKey = mockBookData[0].volumeInfo.title;
const category = mockBookData[0].volumeInfo.categories[0];
describe("getBooksByCategory", () => {
    it("should return books correctly", async () => {
        mock.onGet("/books").reply(200, mockBookData);
        const books = await getBooks();
        expect(books).toEqual(mockBookData);
    });
    it("should return books when the API call with query", async () => {
        mock.onGet(`/books?searchKey=${searchKey}&category=${category}`).reply(
            200,
            mockBookData
        );
        const books = await getBooks({ searchKey, category });

        expect(books).toEqual(mockBookData);
    });
    it("should return error when API call is unsuccessful", async () => {
        mock.onGet(`/books`).reply(500);
        await expect(getBooks()).rejects.toThrow();
    });
});
