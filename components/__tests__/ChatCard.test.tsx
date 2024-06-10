import { render } from "@testing-library/react-native";
import ChatCard from "../ChatCard";

describe("ChatCard", () => {
    it("should render ChatCard with key properties", () => {
        const { getByLabelText } = render(<ChatCard />);
        const senderImage = getByLabelText("image");
        const senderName = getByLabelText("name");
        const lastMessage = getByLabelText("message");
        expect(senderImage).toBeDefined();
        expect(senderName).toBeDefined();
        expect(lastMessage).toBeDefined();
    });
});
