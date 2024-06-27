import { PostType, createPost, editPost } from "@/apis/post";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-ratings";
import Toast from "react-native-toast-message";
import { useMutation, useQueryClient } from "react-query";
import { z } from "zod";
import Button from "../Button";
import FormInputControl from "./FormInputControl";
import { useModalContext } from "@/context/ModalContext";
const DEFAULT_RATING = 3;
const ReviewFormSchema = z.object({
    content: z
        .string({
            message: "Content is required",
        })
        .min(10, { message: "Content must be at least 10 characters long." }),
    rating: z.number().int().min(1).max(5),
});
type ReviewFormType = z.infer<typeof ReviewFormSchema>;
export type ReviewToEdit = ReviewFormType & { id: string };
type ReviewFormProps = {
    bookId: string;
    bookTitle: string;
    review?: ReviewToEdit;
};
const ReviewForm = ({ bookId, bookTitle, review }: ReviewFormProps) => {
    const client = useQueryClient();
    const { closeModal } = useModalContext();
    const { mutateAsync: createReviewMutate } = useMutation({
        mutationFn: createPost,
        mutationKey: "createReview",
        onError: (error: Error) => {
            Toast.show({
                type: "error",
                text1: error.message,
            });
        },
        onSuccess: () => {
            Toast.show({
                type: "success",
                text1: "Review created !",
            });
            client.invalidateQueries(bookId);
            closeModal();
        },
    });
    const { mutateAsync: editReviewMutate } = useMutation({
        mutationFn: editPost,
        mutationKey: "editReview",
        onError: (error: Error) => {
            Toast.show({
                type: "error",
                text1: error.message,
            });
        },
        onSuccess: () => {
            Toast.show({
                type: "success",
                text1: "Review updated !",
            });
            client.invalidateQueries(bookId);
            closeModal();
        },
    });
    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ReviewFormType>({
        resolver: zodResolver(ReviewFormSchema),
        defaultValues: review
            ? {
                  content: review.content,
                  rating: review.rating,
              }
            : {
                  rating: DEFAULT_RATING,
                  content: "",
              },
    });
    return (
        <View style={styles.container}>
            <Text style={styles.header}>
                {review ? "Edit Review" : "Create Review"}
            </Text>
            <View>
                <FormInputControl
                    control={control}
                    error={errors.content}
                    name="content"
                    label="Content"
                    multiline
                    multiHeight={400}
                />
                <Rating
                    style={{ paddingVertical: 10 }}
                    type="star"
                    imageSize={27}
                    showRating
                    onFinishRating={(ratingCompleted: number) => {
                        setValue("rating", ratingCompleted);
                    }}
                    startingValue={review?.rating || DEFAULT_RATING}
                />
                <Button
                    title={review ? "Save" : "Submit"}
                    onPress={handleSubmit(async (data) => {
                        if (review) {
                            await editReviewMutate({
                                postType: PostType.Review,
                                rating: data.rating,
                                content: data.content,
                                postId: review.id,
                            });
                        } else {
                            await createReviewMutate({
                                ...data,
                                bookId,
                                postType: PostType.Review,
                                bookTitle,
                            });
                        }
                    })}
                />
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    header: {
        marginTop: 10,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
    },
    container: {
        paddingHorizontal: 5,
    },
});
export default ReviewForm;
