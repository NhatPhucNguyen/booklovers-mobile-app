import { render } from "@testing-library/react-native";
import Profile from "../profile";
import AuthContextProvider from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import * as ReactQuery from "react-query";
import ModalContextProvider from "@/context/ModalContext";
describe("Profile", () => {
    const client = new QueryClient();
    it("should render key elements", () => {
        jest.spyOn(ReactQuery, "useQuery").mockImplementation(
            jest.fn().mockReturnValue({
                data: { id: "test", name: "test" },
                isLoading: false,
                isError: false,
            })
        );
        const { getByText, getByLabelText } = render(
            <QueryClientProvider client={client}>
                <ModalContextProvider>
                    <AuthContextProvider>
                        <Profile />
                    </AuthContextProvider>
                </ModalContextProvider>
            </QueryClientProvider>
        );
        expect(getByLabelText("image")).toBeDefined();
        expect(getByText("View Profile")).toBeDefined();
        expect(getByText("Create Community")).toBeDefined();
        expect(getByText("Settings")).toBeDefined();
        expect(getByText("Help")).toBeDefined();
        expect(getByText("Logout")).toBeDefined();
    });
});
