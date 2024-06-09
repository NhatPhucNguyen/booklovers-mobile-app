import { getBooksBySubject, getNewestBooks } from "@/apis/book";
import BookItem from "@/components/BookItem";
import BriefPostCard from "@/components/BriefPostCard";
import { Colors } from "@/constants/Colors";
import {
    faComment,
    faRectangleList,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { useQuery } from "react-query";
type Book = {
    title: string;
    imageLinks: {
        thumbnail: string;
        smallThumbnail: string;
    };
};
const Home = () => {
    const { data: books } = useQuery({
        queryFn: getNewestBooks,
        queryKey: ["newestBooks"],
    });
    return (
        <ScrollView>
            <View style={styles.header} accessibilityLabel="header">
                <FontAwesomeIcon
                    icon={faRectangleList}
                    size={20}
                    color={Colors.light.primary}
                />
                <Image
                    source={require("../../assets/images/transparent-logo.png")}
                    style={styles.logo}
                />
                <FontAwesomeIcon
                    icon={faComment}
                    size={20}
                    color={Colors.light.primary}
                />
            </View>

            <View style={styles.groupContainer}>
                <ScrollView
                    horizontal={true}
                    accessibilityLabel="group-container"
                >
                    <GroupItem />
                    <GroupItem />
                    <GroupItem />
                    <GroupItem />
                    <GroupItem />
                    <GroupItem />
                </ScrollView>
            </View>
            <Text style={styles.sectionHeader}>New books</Text>
            <View style={styles.bookList}>
                <ScrollView horizontal={true} accessibilityLabel="book-list">
                    {books?.map((book: Book, index) => {
                        return (
                            <BookItem
                                key={index}
                                title={book.title}
                                imageLinks={book.imageLinks}
                            />
                        );
                    })}
                </ScrollView>
            </View>
            <View
                style={styles.postsContainer}
                accessibilityLabel="posts-container"
            >
                <BriefPostCard postType="group" groupName="test" />
                <BriefPostCard postType="review" bookTitle="Book Title" />
                <BriefPostCard postType="group" groupName="test" />
                <BriefPostCard postType="review" bookTitle="Book Title" />
            </View>
            {/* <Button
                title="Logout"
                onPress={async () => {
                    await logout();
                    await removeData("token");
                    setAuth(false);
                    router.replace("/login");
                }}
            /> */}
        </ScrollView>
    );
};
function GroupItem() {
    return (
        <View style={styles.groupItem}>
            <Image
                source={require("../../assets/images/main-logo.png")}
                style={styles.groupImage}
            />
            <Text style={{ textAlign: "center" }}>Group Name</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    logo: {
        width: 100,
        height: 50,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        backgroundColor: "#E7EFF7",
        paddingLeft: 20,
        paddingRight: 20,
        elevation: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: "#171717",
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    sectionHeader: {
        fontSize: 18,
        paddingLeft: 10,
        fontWeight: "bold",
        marginTop: 20,
    },
    groupContainer: {
        height: 100,
    },
    groupItem: {
        width: 100,
    },
    groupImage: {
        width: 50,
        height: 50,
        objectFit: "cover",
        borderRadius: 50,
        margin: "auto",
    },
    bookList: {
        marginTop: 10,
        height: 210,
    },
    postsContainer: {
        marginTop: 10,
        paddingHorizontal: 10,
    },
});
export default Home;
