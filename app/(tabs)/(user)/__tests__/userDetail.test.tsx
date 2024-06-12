import { render } from "@testing-library/react-native";
import UserDetail from "../[userId]";

describe("UserDetail", () => {
    it("should render key elements", () => {
        const { getByLabelText,getByText } = render(<UserDetail />);
        expect(getByLabelText("actions")).toBeDefined();
        expect(getByLabelText("edit")).toBeDefined();
        expect(getByText("Groups Joined")).toBeDefined();
        expect(getByText("Activities")).toBeDefined();
        expect(getByText("Connections")).toBeDefined();
    });
});
