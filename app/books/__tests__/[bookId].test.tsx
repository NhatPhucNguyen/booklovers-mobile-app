import { mockBookData } from "@/__mocks__/mockData";
import ModalContextProvider from "@/context/ModalContext";
import { render, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import BookDetails from "../[bookId]";
const mockBook = mockBookData[0];
const client = new QueryClient();
jest.mock("@/apis/book", () => ({
    getBookById: jest.fn().mockImplementation(() => {
        return Promise.resolve(mockBook);
    }),
}));
jest.mock("expo-router", () => ({
    useLocalSearchParams: jest.fn().mockReturnValue({ bookId: "1" }),
}));
describe("Book Detail", () => {
    it("should render book detail correctly", async () => {
        const { getByText } = render(
            <QueryClientProvider client={client}>
                <ModalContextProvider>
                    <BookDetails />
                </ModalContextProvider>
            </QueryClientProvider>
        );
        await waitFor(() => {
            expect(getByText(mockBook.volumeInfo.publishedDate)).toBeDefined();
            expect(getByText(mockBook.volumeInfo.title)).toBeDefined();
            expect(
                getByText(mockBook.volumeInfo.categories.join(""))
            ).toBeDefined();
            expect(
                getByText(mockBook.volumeInfo.authors.join(", "))
            ).toBeDefined();
            expect(getByText(mockBook.volumeInfo.publisher)).toBeDefined();
            expect(getByText(mockBook.volumeInfo.description)).toBeDefined();
        });
    });
});
