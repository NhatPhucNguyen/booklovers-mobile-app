import { createPost } from "@/apis/post";
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
type ReviewFormProps = {
    bookId: string;
    bookTitle: string;
};
const ReviewForm = ({ bookId, bookTitle }: ReviewFormProps) => {
    const client = useQueryClient();
    const { closeModal } = useModalContext();
    const { mutateAsync: createReviewMutate } = useMutation({
        mutationFn: createPost,
        mutationKey: "createReview",
        onError: (error:Error) => {
            Toast.show({
                type: "error",
                text1: error.message,
            });
        },
        onSuccess: () => {
            Toast.show({
                type: "success",
                text1: "Review created successfully",
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
        defaultValues: {
            rating: DEFAULT_RATING,
        },
    });
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Create Review</Text>
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
                    startingValue={DEFAULT_RATING}
                />
                <Button
                    title="Submit"
                    onPress={handleSubmit(async (data) => {
                        await createReviewMutate({
                            ...data,
                            bookId,
                            postType: "review",
                            bookTitle,
                        });
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
