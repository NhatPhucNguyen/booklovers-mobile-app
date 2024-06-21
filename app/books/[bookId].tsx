import { getBookById } from "@/apis/book";
import BackHeader from "@/components/BackHeader";
import BriefPostCard from "@/components/BriefPostCard";
import Button from "@/components/Button";
import LoadingScreen from "@/components/LoadingScreen";
import ReviewForm from "@/components/forms/ReviewForm";
import ModalContextProvider, { useModalContext } from "@/context/ModalContext";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
//Book description may contain html tags (<p>,</p>,<br>)
const replaceHTMLTags = (description: string | undefined) => {
    if (!description) return description;
    return description?.replaceAll(/<\/?[^>]+(>|$)/g, "");
};
const BookDetails = () => {
    const { bookId } = useLocalSearchParams<{ bookId: string }>();
    const {
        data: book,
        isLoading,
        isError,
    } = useQuery({
        queryFn: () => getBookById(bookId!, true),
        queryKey: [bookId],
    });
    const [isReadMore, setReadMore] = React.useState(false);
    const { openModal, visible } = useModalContext();
    const description = replaceHTMLTags(book?.volumeInfo.description);
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
                    source={{ uri: book.volumeInfo.imageLinks?.thumbnail }}
                    style={styles.bookImage}
                />
                <View
                    style={{
                        marginTop: 10,
                        paddingHorizontal: 5,
                        paddingBottom: 50,
                    }}
                >
                    <Field label={"Title"} value={book.volumeInfo.title} />
                    <Field
                        label={"Author(s)"}
                        value={book.volumeInfo.authors?.join(", ")}
                    />
                    <Field
                        label={"Published in"}
                        value={book.volumeInfo.publishedDate}
                    />
                    <Field
                        label="Publisher"
                        value={book.volumeInfo.publisher}
                    />
                    <Field
                        label="Categories"
                        value={book.volumeInfo.categories?.join("")}
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
                                <Button
                                    title="Create new review"
                                    onPress={handleClick}
                                />
                                <View style={{ marginTop: 5 }}>
                                    {book.reviews?.map((review) => (
                                        <BriefPostCard
                                            key={review.id}
                                            postType="review"
                                            post={review}
                                            hideTitle
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
                            bookTitle={book.volumeInfo.title}
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
});
export default BookDetails;
