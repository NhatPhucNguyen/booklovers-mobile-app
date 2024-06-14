import { render } from "@testing-library/react-native";
import Discover from "../discover";

describe("Discover", () => {
    it("should render key components", () => {
        const { getByLabelText } = render(<Discover />);
        const searchBar = getByLabelText("search");
        expect(searchBar).toBeDefined();
    });
});
