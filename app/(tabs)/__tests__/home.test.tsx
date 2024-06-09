import { render } from "@testing-library/react-native";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "../home";
const bookData = [
    {
        title: "title",
        imageLinks: {
            thumbnail: "thumbnail",
            smallThumbnail: "smallThumbnail",
        },
    },
];
jest.mock("../../../apis/book", () => {
    return {
        getBooksBySubject: jest.fn().mockResolvedValue(bookData),
    };
});
describe("Home Page", () => {
    const client = new QueryClient();
    test("renders with key component", () => {
        const { getByLabelText, getByText } = render(
            <QueryClientProvider client={client}>
                <Home />
            </QueryClientProvider>
        );
        const header = getByLabelText("header");
        const groupContainer = getByLabelText("group-container");
        const bookList = getByLabelText("book-list");
        expect(header).toBeDefined();
        expect(groupContainer).toBeDefined();
        expect(bookList).toBeDefined();
        expect(getByText("New reviewed books")).toBeDefined();
    });
    test("render books retrieved from api", () => {
        const { getByText } = render(
            <QueryClientProvider client={client}>
                <Home />
            </QueryClientProvider>
        );
        expect(getByText(bookData[0].title)).toBeDefined();
    });
});
