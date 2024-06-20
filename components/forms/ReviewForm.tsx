import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { z } from "zod";
import FormInputControl from "./FormInputControl";
import { Rating } from "react-native-ratings";
import Button from "../Button";
const DEFAULT_RATING = 3;
const ReviewFormSchema = z.object({
    title: z
        .string({
            message: "Title is required",
        })
        .min(3, {
            message: "Title must be at least 3 characters long.",
        })
        .max(100),
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
                    error={errors.title}
                    name="title"
                    label="Title"
                />
                <FormInputControl
                    control={control}
                    error={errors.content}
                    name="content"
                    label="Content"
                    multiline
                />
                <Rating
                    style={{ paddingVertical: 10 }}
                    type="heart"
                    imageSize={27}
                    showRating
                    onFinishRating={(ratingCompleted: number) => {
                        setValue("rating", ratingCompleted);
                    }}
                    startingValue={DEFAULT_RATING}
                />
                <Button
                    title="Submit"
                    onPress={handleSubmit((data) => {
                        console.log(data);
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
