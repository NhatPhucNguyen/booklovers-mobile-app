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
