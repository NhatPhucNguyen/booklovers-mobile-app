import { render } from "@testing-library/react-native";
import Profile from "../profile";
import AuthContextProvider from "@/context/AuthContext";

describe("Profile", () => {
    it("should render key elements", () => {
        const { getByText, getByLabelText } = render(
            <AuthContextProvider>
                <Profile />
            </AuthContextProvider>
        );
        expect(getByLabelText("image")).toBeDefined();
        expect(getByText("View Profile")).toBeDefined();
        expect(getByText("Create Community")).toBeDefined();
        expect(getByText("Settings")).toBeDefined();
        expect(getByText("Help")).toBeDefined();
        expect(getByText("Logout")).toBeDefined();
    });
});
