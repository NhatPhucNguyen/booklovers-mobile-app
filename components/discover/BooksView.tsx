import React from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
const BOOK_CATEGORIES = [
    "All",
    "Fiction",
    "Non-fiction",
    "Science",
    "Technology",
    "History",
    "Biography & Autobiography",
    "Self-Help",
    "Health & Fitness",
    "Business & Economics",
    "Education",
    "Religion",
    "Philosophy",
    "Art",
    "Travel",
    "Cooking",
];
const BooksView = () => {
    const renderCategories = ({ item }: { item: string }) => {
        return (
            <TouchableOpacity key={item} style={styles.categoryCard}>
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: 18,
                        fontWeight: "600",
                    }}
                >
                    {item}
                </Text>
            </TouchableOpacity>
        );
    };
    return (
        <View>
            <FlatList
                data={BOOK_CATEGORIES}
                renderItem={renderCategories}
                keyExtractor={(item) => item}
                numColumns={2}
                contentContainerStyle={styles.categoriesList}
                style={{ width: "100%" }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    categoriesList: {
        margin: "auto",
    },
    categoryCard: {
        margin: 10,
        width: 150,
        height: 60,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        backgroundColor: "#f9dccb",
        display: "flex",
        justifyContent: "center",
        borderRadius: 10,
    },
});
export default BooksView;
