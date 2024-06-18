import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
type BookItemProps = {
    title: string;
    imageLinks?: {
        thumbnail?: string;
        smallThumbnail?: string;
    };
    details?: boolean;
    id: string;
};
const TITLE_MAX_LENGTH = 30;
const BookItem = ({ title, imageLinks, details, id }: BookItemProps) => {
    return (
        <Pressable
            style={styles.bookItem}
            onPress={() => {
                router.push({
                    pathname: "/books/[bookId]",
                    params: { bookId: id },
                });
            }}
        >
            <Image
                source={{ uri: imageLinks?.thumbnail }}
                style={styles.bookImage}
            />
            <Text style={styles.bookTitle}>
                {title.length > TITLE_MAX_LENGTH
                    ? `${title.substring(0, TITLE_MAX_LENGTH - 3)}...`
                    : title}
            </Text>
        </Pressable>
    );
};
const styles = StyleSheet.create({
    bookItem: {
        width: 170,
        height: 200,
        backgroundColor: Colors.light.secondary,
        paddingVertical: 5,
        margin: "auto",
    },
    bookImage: {
        width: 120,
        height: 150,
        objectFit: "fill",
        margin: "auto",
    },
    bookTitle: {
        textAlign: "center",
        fontSize: 12,
    },
});
export default BookItem;
