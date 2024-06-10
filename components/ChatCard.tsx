import { Colors } from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const ChatCard = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/images/unknown-person.png")}
                accessibilityLabel="image"
                style={styles.image}
            />
            <View style={styles.body}>
                <View style={styles.section}>
                    <View>
                        <Text
                            accessibilityLabel="name"
                            style={styles.senderName}
                        >
                            Sender Name
                        </Text>
                    </View>
                    <View>
                        <Text style={styles.time}>9:10pm</Text>
                    </View>
                </View>
                <View style={styles.section}>
                    <Text accessibilityLabel="message">Last message</Text>
                    <Text style={styles.number}>4</Text>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    container: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        gap: 10,
        backgroundColor: Colors.light.background,
        padding: 10,
    },
    body: {
        flex: 1,
        flexDirection: "column",
    },
    senderName: {
        fontWeight: "bold",
    },
    time: { marginLeft: "auto" },
    number: {
        backgroundColor: Colors.light.primary,
        color: Colors.light.background,
        borderRadius: 50,
        width: 20,
        height: 20,
        textAlign: "center",
    },
    section: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});
export default ChatCard;
