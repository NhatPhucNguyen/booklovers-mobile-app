import { render, userEvent } from "@testing-library/react-native";
import React from "react";
import BriefPostCard from "../BriefPostCard";
const post = {
    id: "123",
    author: {
        name: "John Doe",
        id: "456",
    },
    content: "This is a test post",
    updatedAt: new Date(),
    _counts: {
        like: 5,
        comment: 3,
    },
};
describe("BriefPostCard", () => {
    const user = userEvent.setup({
        delay: 500,
    });
    it("renders group post correctly", () => {
        const { getByLabelText } = render(
            <BriefPostCard postType="group" groupName="test" post={post}/>
        );

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
    it("render joined group post correctly", () => {
        const { queryByLabelText } = render(
            <BriefPostCard
                postType="group"
                groupName="test"
                isJoined
                post={post}
            />
        );
        expect(queryByLabelText("join-button")).toBeNull();
    });
    it("renders review post correctly", () => {
        const review = {
            id: "123",
            author: {
                name: "John Doe",
                id: "456",
            },
            rating: 5,
            content: "This book is amazing!",
            updatedAt: new Date(),
            _counts: {
                like: 5,
            },
        };
        const { queryByLabelText } = render(
            <BriefPostCard postType="review" post={review} />
        );
        expect(queryByLabelText("join-button")).toBeNull();
    });
    it("toggles like button", async () => {
        const { getByLabelText, queryByTestId } = render(
            <BriefPostCard postType="group" groupName="test" post={post}/>
        );

        const likeButton = getByLabelText("like-button");

        expect(queryByTestId("like-icon")).toBeDefined();
        expect(queryByTestId("like-icon-pressed")).toBeNull();
        await user.press(likeButton);
        expect(queryByTestId("like-icon")).toBeNull();
        expect(queryByTestId("like-icon-pressed")).toBeDefined();
    });
});
