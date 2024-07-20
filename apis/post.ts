import { Discussion } from "@/interfaces/Group";
import axiosInstance from "@/lib/axiosInstance";
export enum PostType {
    Review = "review",
    Discussion = "discussion",
}
export type CreatePost = { content: string } & (
    | {
          rating?: number;
          bookId: string;
          postType: PostType.Review;
          bookTitle: string;
      }
    | {
          postType: PostType.Discussion;
          groupId: string;
      }
);
export type EditPost = { postId: string; content: string } & (
    | { postType: PostType.Review; rating: number }
    | { postType: PostType.Discussion }
);
export const createPost = async (post: CreatePost): Promise<boolean> => {
    try {
        await axiosInstance.post("/posts", post);
        return true;
    } catch (error) {
        console.log(error);
        throw new Error("Fail to create post");
    }
};
export const editPost = async (post: EditPost): Promise<boolean> => {
    try {
        await axiosInstance.patch(`/posts/${post.postId}`, post);
        return true;
    } catch (error) {
        console.log(error);
        throw new Error("Fail to edit post");
    }
};
export const deletePost = async (postId: string): Promise<boolean> => {
    try {
        await axiosInstance.delete(`/posts/${postId}`);
        return true;
    } catch (error) {
        console.log(error);
        throw new Error("Fail to delete post");
    }
};
export const likePost = async (postId: string): Promise<boolean> => {
    try {
        await axiosInstance.patch(`/posts/${postId}/like`);
        return true;
    } catch (error) {
        console.log(error);
        throw new Error("Fail to like post");
    }
};
export const getDiscussionsByGroupId = async (
    groupId: string
): Promise<Discussion[]> => {
    try {
        const response = await axiosInstance.get(`/posts/group/${groupId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Fail to get posts");
    }
};
