import axiosMock from "@/__mocks__/axiosMock";
import { CreatePost, createPost } from "@/apis/post";

describe("Post API", () => {
    it("should create review post correctly", async () => {
        // Test case 1: Create a review post
        const reviewPost: CreatePost = {
            content: "This book is amazing!",
            rating: 5,
            bookId: "123",
            postType: "review",
            bookTitle: "The Great Gatsby",
        };
        axiosMock.onPost("/posts").reply(200);
        const reviewPostCreated = await createPost(reviewPost);
        expect(reviewPostCreated).toBe(true);
    });
    it("should create a discussion post correctly", async () => {
        // Test case 2: Create a discussion post
        const discussionPost: CreatePost = {
            content: "Let's talk about this book!",
            postType: "discussion",
            groupId: "456",
        };
        axiosMock.onPost("/posts").reply(200);
        const discussionPostCreated = await createPost(discussionPost);
        expect(discussionPostCreated).toBe(true);
    });
    it("should return error when API call is unsuccessful", async () => {
        const post: CreatePost = {
            content: "This book is amazing!",
            rating: 5,
            bookId: "123",
            postType: "review",
            bookTitle: "The Great Gatsby",
        };
        axiosMock.onPost("/posts").reply(500);
        await expect(createPost(post)).rejects.toThrow();
    });
});
