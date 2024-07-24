import { mockBookData } from "@/__mocks__/mockData";
import AuthContextProvider from "@/context/AuthContext";
import { render, userEvent } from "@testing-library/react-native";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import PostCard from "../PostCard";
const post = {
    id: "123",
    author: {
        name: "John Doe",
        id: "456",
    },
    content: "This is a test post",
    updatedAt: new Date(),
    _count: {
        likes: 5,
    },
    likes: [],
};
const createWrapper = () => {
    const client = new QueryClient();
    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={client}>
            <AuthContextProvider>{children}</AuthContextProvider>
        </QueryClientProvider>
    );
};
jest.mock("@/apis/post", () => ({
    likePost: jest.fn().mockResolvedValueOnce(true),
}));
describe("PostCard", () => {
    const user = userEvent.setup({
        delay: 500,
    });
    it("renders group post correctly", () => {
        const { getByLabelText } = render(
            <PostCard postType="group" groupName="test" post={post} />,
            {
                wrapper: createWrapper(),
            }
        );

        const postType = getByLabelText("post-name");
        const cardFooter = getByLabelText("card-footer");
        const joinButton = getByLabelText("join-button");
        const likeButton = getByLabelText("like-button");
        const commentButton = getByLabelText("comment-button");

        expect(postType).toBeDefined();
        expect(cardFooter).toBeDefined();
        expect(joinButton).toBeDefined();
        expect(likeButton).toBeDefined();
        expect(commentButton).toBeDefined();
    });
    it("render joined group post correctly", () => {
        const { queryByLabelText } = render(
            <PostCard
                postType="group"
                groupName="test"
                isJoined
                post={post}
            />,
            {
                wrapper: createWrapper(),
            }
        );
        expect(queryByLabelText("join-button")).toBeNull();
    });
    it("renders review post correctly", () => {
        const review = mockBookData[0].reviews[0];
        const { queryByLabelText } = render(
            <PostCard
                postType="review"
                post={{ ...review, updatedAt: new Date() }}
            />,
            {
                wrapper: createWrapper(),
            }
        );
        expect(queryByLabelText("join-button")).toBeNull();
    });
    it("toggles like button", async () => {
        const { getByLabelText, queryByTestId } = render(
            <PostCard postType="group" groupName="test" post={post} />,
            {
                wrapper: createWrapper(),
            }
        );

        const likeButton = getByLabelText("like-button");

        expect(queryByTestId("like-icon")).toBeDefined();
        expect(queryByTestId("like-icon-pressed")).toBeNull();
        await user.press(likeButton);
        expect(queryByTestId("like-icon")).toBeNull();
        expect(queryByTestId("like-icon-pressed")).toBeDefined();
    });
});
