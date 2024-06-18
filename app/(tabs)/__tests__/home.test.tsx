import { render, waitFor } from "@testing-library/react-native";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import Home from "../home";
const bookData = [
    {
        id: "1",
        volumeInfo: {
            title: "title",
            imageLinks: {
                thumbnail: "thumbnail",
                smallThumbnail: "smallThumbnail",
            },
            categories: ["category"],
        },
    },
];
jest.mock("../../../apis/book", () => {
    return {
        getBooks: jest.fn().mockResolvedValue(bookData),
    };
});
describe("Home Page", () => {
    const client = new QueryClient();
    test("renders with key component", async () => {
        const { getByLabelText, getByText } = render(
            <QueryClientProvider client={client}>
                <Home />
            </QueryClientProvider>
        );
        const header = getByLabelText("header");
        const groupContainer = getByLabelText("group-container");

        const postsContainer = getByLabelText("posts-container");
        expect(header).toBeDefined();
        expect(groupContainer).toBeDefined();

        expect(postsContainer).toBeDefined();
        expect(getByText("New books")).toBeDefined();
        await waitFor(() => {
            const bookList = getByLabelText("book-list");
            expect(bookList).toBeDefined();
        });
    });
    test("render books retrieved from api", () => {
        const { getByText } = render(
            <QueryClientProvider client={client}>
                <Home />
            </QueryClientProvider>
        );
        expect(getByText(bookData[0].volumeInfo.title)).toBeDefined();
    });
});
