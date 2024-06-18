import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { EvilIcons } from "@expo/vector-icons";
import { useQuery } from "react-query";
import { getBooks } from "@/apis/book";
import LoadingScreen from "@/components/LoadingScreen";
import BookItem from "@/components/BookItem";
import BackHeader from "@/components/BackHeader";

const BooksTab = () => {
    const { category } = useLocalSearchParams<{ category: string }>();
    const {
        data: books,
        isLoading,
        isError,
    } = useQuery({
        queryFn: () => {
            return category !== "All" ? getBooks({ category }) : getBooks();
        },
        queryKey: [category],
    });
    if (isLoading) {
        return <LoadingScreen />;
    }
    if (isError || !books) {
        return (
            <SafeAreaView>
                <BackHeader />
                <Text>No books found</Text>
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView>
            <BackHeader />
            <View
                style={{
                    paddingHorizontal: 5,
                    marginTop: 10,
                    paddingBottom: 10,
                }}
            >
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                    {category && FilterOption(category)}
                </ScrollView>
            </View>
            <ScrollView>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: 10,
                        paddingBottom: 70,
                    }}
                >
                    {books?.map((book, index) => {
                        return (
                            <View
                                style={{
                                    flexGrow: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                key={index}
                            >
                                <BookItem
                                    title={book.volumeInfo.title}
                                    imageLinks={book.volumeInfo.imageLinks}
                                    id={book.id}
                                />
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
function FilterOption(key: string) {
    return (
        <View style={styles.filterOption}>
            <EvilIcons name="close" size={16} color={Colors.light.primary} />
            <Text style={styles.filterText}>{key}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    filterOption: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Colors.light.primary,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
        gap: 1,
    },
    filterText: {
        color: Colors.light.primary,
        fontSize: 16,
    },
});
export default BooksTab;
