import { getBookById } from "@/apis/book";
import { deletePost } from "@/apis/post";
import BackHeader from "@/components/BackHeader";
import BriefPostCard from "@/components/BriefPostCard";
import Button from "@/components/Button";
import LoadingScreen from "@/components/LoadingScreen";
import ReviewForm, { ReviewToEdit } from "@/components/forms/ReviewForm";
import { Colors } from "@/constants/Colors";
import ModalContextProvider, { useModalContext } from "@/context/ModalContext";
import useAuthContext from "@/hooks/useAuthContext";
import { Review } from "@/interfaces/Book";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Rating } from "react-native-ratings";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { useMutation, useQuery, useQueryClient } from "react-query";
//Book description may contain html tags (<p>,</p>,<br>)
const replaceHTMLTags = (description: string | undefined) => {
    if (!description) return description;
    return description?.replaceAll(/<\/?[^>]+(>|$)/g, "");
};
const BookDetails = () => {
    const client = useQueryClient();
    const { bookId } = useLocalSearchParams<{ bookId: string }>();
    const { user } = useAuthContext();
    const [isUserCreated, setUserCreated] = useState(true);
    const [reviewToEdit, setReviewToEdit] = useState<ReviewToEdit | undefined>(
        undefined
    );
    const {
        data: book,
        isLoading,
        isError,
    } = useQuery({
        queryFn: () => getBookById(bookId!, true),
        queryKey: [bookId],
        onSuccess: async (data) => {
            if (
                data.reviews?.some(
                    (review: Review) => review.author.id === user?.id
                )
            ) {
                setUserCreated(true);
            } else {
                setUserCreated(false);
            }
        },
        cacheTime: 0,
    });
    const { mutateAsync: deletePostMutate } = useMutation({
        mutationFn: deletePost,
        mutationKey: "deletePost",
        onError: (error: Error) => {
            Toast.show({ type: "error", text1: error.message });
        },
        onSuccess: () => {
            client.invalidateQueries(bookId);
            Toast.show({ type: "success", text1: "Review deleted" });
        },
    });
    const [isReadMore, setReadMore] = React.useState(false);
    const { openModal, visible } = useModalContext();
    const description = replaceHTMLTags(book?.description);
    if (isLoading) {
        return <LoadingScreen />;
    }
    if (isError || !book) {
        return (
            <SafeAreaView>
                <BackHeader />
                <Text>No book found</Text>
            </SafeAreaView>
        );
    }
    const handleClick = () => {
        openModal();
    };
    return (
        <SafeAreaView>
            <BackHeader />
            <ScrollView style={{ minHeight: "100%" }}>
                <Image
                    source={{ uri: book.imageLinks?.thumbnail }}
                    style={styles.bookImage}
                />
                <View style={styles.ratingContainer}>
                    <View style={styles.ratingSource}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "brown",
                            }}
                        >
                            Open Library
                        </Text>
                        <ReadonlyRating rating={book.avgRating || 0}/>
                    </View>
                    <View style={styles.ratingSource}>
                        <Text
                            style={{
                                textAlign: "center",
                                fontWeight: "bold",
                                color: "green",
                            }}
                        >
                            BookLovers
                        </Text>
                        <ReadonlyRating rating={book.userRating || 0}/>
                    </View>
                </View>

                <View
                    style={{
                        marginTop: 10,
                        paddingHorizontal: 5,
                        paddingBottom: 50,
                    }}
                >
                    <Field label={"Title"} value={book.title} />
                    <Field
                        label={"Author(s)"}
                        value={book.authors?.join(", ")}
                    />
                    <Field
                        label="Categories"
                        value={book.categories?.join(", ")}
                    />
                    <>
                        {!isReadMore &&
                        description &&
                        description.length > 200 ? (
                            <Text>
                                <Text style={styles.label}>Description: </Text>
                                <Text>{description.slice(0, 200)}</Text>
                                <Text
                                    style={{ color: "blue" }}
                                    onPress={() => setReadMore(!isReadMore)}
                                >
                                    ...more
                                </Text>
                            </Text>
                        ) : (
                            <Field label={"Description"} value={description} />
                        )}
                    </>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: "bold",
                            marginTop: 2,
                        }}
                    >
                        Reviews
                    </Text>
                    <View>
                        {book.reviews ? (
                            <>
                                {!isUserCreated && (
                                    <Button
                                        title="Create new review"
                                        onPress={handleClick}
                                    />
                                )}
                                <View style={{ marginTop: 5 }}>
                                    {book.reviews?.map((review) => (
                                        <BriefPostCard
                                            key={review.id}
                                            postType="review"
                                            post={review}
                                            hideTitle
                                            modified={
                                                review.author.id === user?.id
                                            }
                                            actions={{
                                                onDelete: async () => {
                                                    await deletePostMutate(
                                                        review.id
                                                    );
                                                },
                                                onEdit: () => {
                                                    setReviewToEdit({
                                                        content: review.content,
                                                        rating:
                                                            review.rating || 0,
                                                        id: review.id,
                                                    });
                                                    openModal();
                                                },
                                            }}
                                        />
                                    ))}
                                </View>
                            </>
                        ) : (
                            <Button
                                title="Create first review"
                                onPress={handleClick}
                            />
                        )}
                    </View>
                </View>
                {visible && (
                    <ModalContextProvider.Modal>
                        <ReviewForm
                            bookId={book.id}
                            bookTitle={book.title}
                            review={reviewToEdit}
                        />
                    </ModalContextProvider.Modal>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};
function Field({ label, value }: { label: string; value?: string }) {
    return (
        <Text>
            <Text style={styles.label}>{label}: </Text>
            <Text>{value || "N/A"}</Text>
        </Text>
    );
}
function ReadonlyRating({ rating }: { rating: number }) {
    return (
        <Rating
            type="star"
            imageSize={20}
            startingValue={rating}
            readonly
            tintColor={Colors.light.primary}
            style={{ marginTop: 5, padding: 5 }}
            showRating
            showReadOnlyText={false}
            fractions={1}
        />
    );
}
const styles = StyleSheet.create({
    bookImage: {
        width: 150,
        height: 150,
        objectFit: "fill",
        margin: "auto",
        borderWidth: 1,
    },
    label: {
        fontWeight: "bold",
    },
    ratingText: {},
    ratingContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 10,
    },
    ratingSource: {},
});
export default BookDetails;
