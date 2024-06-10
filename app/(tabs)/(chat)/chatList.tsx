import ChatCard from "@/components/ChatCard";
import { Colors } from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { ScrollView, TextInput, View, StyleSheet } from "react-native";

const ChatList = () => {
    return (
        <ScrollView>
            <View accessibilityLabel="search" style={styles.search}>
                <AntDesign name="search1" size={24} color="black" />
                <TextInput
                    placeholder="Search"
                    accessibilityLabel="searchInput"
                    style={styles.searchInput}
                    placeholderTextColor={Colors.light.placeHolder}
                />
            </View>
            <View style={styles.cardContainer}>
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
                <ChatCard />
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    search: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.light.lightBlue,
        padding: 10,
        margin: 10,
        borderRadius: 20,
    },
    searchInput: {
        width: "100%",
        fontSize: 16,
        paddingLeft: 10,
    },
    cardContainer: {
        display: "flex",
        flexDirection: "column",
        gap: 10,
        paddingHorizontal: 10,
    },
});
export default ChatList;
