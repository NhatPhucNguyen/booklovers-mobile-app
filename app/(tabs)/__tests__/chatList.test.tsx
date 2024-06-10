import { render } from "@testing-library/react-native";
import ChatList from "../(chat)/chatList";

describe("chatList", () => {
    it("should render chatList", () => {
        const { getByLabelText } = render(<ChatList />);
        const searchBar = getByLabelText("search");
        const searchInput = getByLabelText("searchInput");
        expect(searchBar).toBeDefined();
        expect(searchInput).toBeDefined();
    });
});
