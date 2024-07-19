import { mockBookData } from "@/__mocks__/mockData";
import { render, waitFor } from "@testing-library/react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import BooksTab from "..";
jest.mock("expo-router", () => ({
    useLocalSearchParams: jest.fn().mockReturnValue({ category: "category" }),
}));
jest.mock("@/apis/book", () => ({
    getBooks: jest.fn().mockResolvedValueOnce(mockBookData),
}));
const client = new QueryClient();
describe("Books Tab", () => {
    it("should render query key correctly", async () => {
        const { getByText } = render(
            <QueryClientProvider client={client}>
                <BooksTab />
            </QueryClientProvider>
        );
        await waitFor(()=>{
            expect(getByText("category")).toBeDefined();
        })
        
    });
    it("should render list of books", async () => {
        const { getByText } = render(
            <QueryClientProvider client={client}>
                <BooksTab />
            </QueryClientProvider>
        );
        await waitFor(() => {
            expect(getByText(mockBookData[0].title)).toBeDefined();
        });
    });
});
