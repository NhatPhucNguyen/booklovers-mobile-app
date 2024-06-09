import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
type BookItemProps = {
    title: string;
    imageLinks: {
        thumbnail: string;
        smallThumbnail: string;
    };
};
const BookItem = ({ title, imageLinks }: BookItemProps) => {
    return (
        <View style={styles.bookItem}>
            <Image
                source={{ uri: imageLinks.thumbnail }}
                style={styles.bookImage}
            />
            <Text style={styles.bookTitle}>{title}</Text>
        </View>
    );
};
const styles = StyleSheet.create({
    bookItem: {
        width: 150,
        height: 200,
        backgroundColor: Colors.light.secondary,
        marginEnd: 10,
        paddingVertical: 5,
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
