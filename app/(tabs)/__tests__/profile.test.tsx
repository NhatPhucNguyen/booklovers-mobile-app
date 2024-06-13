import { render } from "@testing-library/react-native";
import Profile from "../profile";
import AuthContextProvider from "@/context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

describe("Profile", () => {
    const client = new QueryClient();
    it("should render key elements", () => {
        const { getByText, getByLabelText } = render(
            <QueryClientProvider client={client}>
                <AuthContextProvider>
                    <Profile />
                </AuthContextProvider>
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
