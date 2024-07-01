import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    ActivityIndicator,
} from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { EvilIcons } from "@expo/vector-icons";
import { useInfiniteQuery, useQuery } from "react-query";
import { getBooks } from "@/apis/book";
import LoadingScreen from "@/components/LoadingScreen";
import BookItem from "@/components/BookItem";
import BackHeader from "@/components/BackHeader";

const BooksTab = () => {
    const { category } = useLocalSearchParams<{ category: string }>();
    // const {
    //     data: books,
    //     isLoading,
    //     isError,
    // } = useQuery({
    //     queryFn: () => {
    //         return category !== "All" ? getBooks({ category }) : getBooks();
    //     },
    //     queryKey: [category],
    // });
    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useInfiniteQuery({
        queryFn: ({ pageParam = 1 }) => {
            return category !== "All"
                ? getBooks({ category, startIndex: pageParam })
                : getBooks({ startIndex: pageParam });
        },
        queryKey: [category],
        getNextPageParam: (lastPage, allPages) => {
            return lastPage.length > 0 ? allPages.length + 1 : undefined;
        },
    });
    if (isLoading) {
        return <LoadingScreen />;
    }
    if (isError || !data?.pages) {
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
            <FlatList
                data={data.pages.flat()}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.bookItemContainer} key={item.id}>
                            <BookItem
                                title={item.title}
                                imageLinks={item.imageLinks}
                                id={item.id}
                            />
                        </View>
                    );
                }}
                numColumns={2}
                ListEmptyComponent={<Text>No books found</Text>}
                keyExtractor={(item) => item.id}
                onEndReached={() => {
                    if (!isFetchingNextPage && hasNextPage) {
                        fetchNextPage();
                    }
                }}
                ListFooterComponent={() => {
                    return isFetchingNextPage ? <ActivityIndicator /> : null;
                }}
            />
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
    bookItemContainer: {
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
});
export default BooksTab;
