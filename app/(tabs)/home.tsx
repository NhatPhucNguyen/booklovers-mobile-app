import { getBooks } from "@/apis/book";
import { getGroups } from "@/apis/group";
import BookItem from "@/components/BookItem";
import BriefPostCard from "@/components/BriefPostCard";
import { Colors } from "@/constants/Colors";
import { Book } from "@/interfaces/Book";
import {
    faComment,
    faRectangleList,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { router } from "expo-router";
import React from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
const Home = () => {
    const { data: books } = useQuery({
        queryFn: () => getBooks(),
        queryKey: ["books"],
    });
    const { data: joinedGroups, isLoading } = useQuery({
        queryFn: () => getGroups({ join: true }),
        queryKey: ["groups", "joinedGroups"],
    });
    return (
        <SafeAreaView style={styles.container}>
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
                    <Pressable
                        onPress={() => {
                            router.push("/chatList");
                        }}
                    >
                        <FontAwesomeIcon
                            icon={faComment}
                            size={20}
                            color={Colors.light.primary}
                        />
                    </Pressable>
                </View>

                <View style={styles.groupContainer}>
                    <ScrollView
                        horizontal={true}
                        accessibilityLabel="group-container"
                    >
                        {isLoading && <ActivityIndicator />}
                        {joinedGroups &&
                            joinedGroups.map((group, index) => {
                                return (
                                    <GroupItem key={index} name={group.name} />
                                );
                            })}
                    </ScrollView>
                </View>
                <Text style={styles.sectionHeader}>New books</Text>
                <View style={styles.bookList}>
                    {books && (
                        <ScrollView
                            horizontal={true}
                            accessibilityLabel="book-list"
                        >
                            {books.map((book: Book, index) => {
                                return (
                                    <BookItem
                                        key={index}
                                        title={book.title}
                                        imageLinks={book.imageLinks}
                                        id={book.id}
                                    />
                                );
                            })}
                        </ScrollView>
                    )}
                </View>
                <View
                    style={styles.postsContainer}
                    accessibilityLabel="posts-container"
                >
                    {/** Posts Card here */}
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
        </SafeAreaView>
    );
};
function GroupItem({ name }: { name: string }) {
    const shortenName = name.length > 10 ? name.slice(0, 10) + "..." : name;
    return (
        <View style={styles.groupItem}>
            <Image
                source={require("../../assets/images/main-logo.png")}
                style={styles.groupImage}
            />
            <Text style={{ textAlign: "center" }}>{shortenName}</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.background,
        alignItems: "center",
    },
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
