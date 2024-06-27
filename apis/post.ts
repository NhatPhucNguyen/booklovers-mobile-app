import axiosInstance from "@/lib/axiosInstance";
export type CreatePost = { content: string } & (
    | {
          rating?: number;
          bookId: string;
          postType: "review";
          bookTitle: string;
      }
    | {
          postType: "discussion";
          groupId: string;
      }
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
