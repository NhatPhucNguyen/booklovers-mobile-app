import MockAdapter from "axios-mock-adapter";
import { getBooksBySubject, googleBookAPI } from "../book";
import axios from "axios";
const mock = new MockAdapter(axios);
describe("getBooksBySubject", () => {
    const testKey = process.env.EXPO_PUBLIC_GG_API_KEY;
    console.log(testKey);
    it("should return books when the API call is successful", async () => {
        const mockBooks = [{ volumeInfo: { title: "book1" } }];
        const subject = "fiction";
        mock.onGet(`${googleBookAPI}?q=subject:${subject}&key=${testKey}`).reply(200, {
            items: mockBooks,
        });
        const books = await getBooksBySubject(subject);

        expect(books).toEqual(mockBooks.map((item) => item.volumeInfo));
    });
    it("should return error when API call is unsuccessful", async () => {
        const subject = "fiction";
        mock.onGet(`${googleBookAPI}?q=subject:${subject}&key=${testKey}`).reply(500);
        await expect(getBooksBySubject(subject)).rejects.toThrow();
    });
});
