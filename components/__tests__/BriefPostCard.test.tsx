import React from "react";
import { render, userEvent } from "@testing-library/react-native";
import BriefPostCard from "../BriefPostCard";

describe("BriefPostCard", () => {
    const user = userEvent.setup({
        delay: 500,
    });
    it("renders correctly", () => {
        const { getByLabelText } = render(<BriefPostCard />);

        const postType = getByLabelText("post-name");
        const cardBody = getByLabelText("card-body");
        const cardFooter = getByLabelText("card-footer");
        const joinButton = getByLabelText("join-button");
        const likeButton = getByLabelText("like-button");
        const commentButton = getByLabelText("comment-button");

        expect(postType).toBeDefined();
        expect(cardBody).toBeDefined();
        expect(cardFooter).toBeDefined();
        expect(joinButton).toBeDefined();
        expect(likeButton).toBeDefined();
        expect(commentButton).toBeDefined();
    });
    it("toggles like button", async () => {
        const { getByLabelText, getByTestId, queryByTestId } = render(
            <BriefPostCard />
        );

        const likeButton = getByLabelText("like-button");

        expect(queryByTestId("like-icon")).toBeDefined();
        expect(queryByTestId("like-icon-pressed")).toBeNull();
        await user.press(likeButton);
        expect(queryByTestId("like-icon")).toBeNull();
        expect(queryByTestId("like-icon-pressed")).toBeDefined();
    });
});
